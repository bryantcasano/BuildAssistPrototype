<template>
  <div class="q-pa-sm">
    <span class="login-heading">Forgot your password?</span>
    <br />
     <div class="login-p">Then please enter your email address below and we will send you an email to change your password.</div>

    <q-form @submit.prevent="loadData" class="q-gutter-md q-mt-md">
      <q-input
        v-model.trim="email"
        label="Enter active email address"
        borderless
        dense
        class="login__input q-mt-md q-mb-md"
        @input="$v.email.$touch()"
        :rules="[ 
          val => $v.email.required || 'This field is required',
          val => $v.email.email || 'Invalid email format'
        ]"
        @click="hideErrorMessage"
      />
      <div id="errorMessage" v-if="!isHidden">
        <q-icon name="warning" class="text-red login__iconwarning" />
        <span>{{ errMsg }}</span>
      </div>

      <q-btn
        id="login__submit"
        class="q-mb-md"
        label="Send"
        type="submit"
        :loading="submitting"
      >
        <template v-slot:loading>
          <q-spinner-facebook></q-spinner-facebook>
        </template>
      </q-btn>
    </q-form>

    <div class="col-md-12">
      <div class="row">
        <div class="col-xs-12 col-md-12 text-center">
          <span>If you still need help, contact <a href="mailto:support@test.com" class="login__mail">Support.</a></span>
        </div>
        <div class="col-xs-12 col-md-12 text-center">
          <router-link to="/login">Back to login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
// $
@import '../assets/css/login.scss';
</style>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      isHidden: true,
      email: null,
      errMsg: '',
      submitting: false
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },

  methods: {
    hideErrorMessage () {
      this.isHidden = true;
    },
    loadData () {
      this.submitting = true;

      // start of api call
      const url = 'statics/loginConfig.json';
      const params = {
        email: this.email,
        auth_token: 'sampletoken101', // pre-defined data as per database
        company_id: 1                 // pre-defined data as per database
      };

      fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.email == params.email) {
          localStorage.setItem('email', this.email);
          localStorage.setItem('auth', true);
          this.$router.push({name: 'password-reset-sent'});
        } else {
          this.isHidden = false;
          this.errMsg = "Invalid email.";
        }
        
        this.submitting = false;
      })
      .catch(error => {
        console.log(error);
        
        this.isHidden = false;
        this.errMsg = error;
        
        this.submitting = false;
      });

    }
  }
}
</script>
