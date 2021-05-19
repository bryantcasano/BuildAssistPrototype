<template>
  <div>
    <p class="q-mb-lg login-heading">Reset your password</p>

    <q-form @submit="loadData" class="q-gutter-md q-pt-sm">
      <q-input
        class="login__input q-my-md"
        borderless
        dense
        label="Enter Your New Password"
        v-model="password"
        ref="password"
        :rules="[ 
          val => val !== null && val !== '' || 'This field is required',
          val => val.length >= 5 || 'Minimum length should be atleast 5 characters'
        ]"
        :type="isPwd ? 'password' : 'text'"
        @click="hideErrorMessage"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd=! isPwd"
          />
        </template>
      </q-input>
      <q-input 
        class="login__input q-my-md" 
        borderless
        dense
        label="Confirm Your New Password"
        v-model="confirm_password"
        ref="confirm_password"
        :rules="[ 
          val => val !== null && val !== '' || 'This field is required',
          val => val.length >= 5 || 'Minimum length should be atleast 5 characters',
          val => val === this.$refs.password.value || 'Password mismatched'
        ]"
        :type="isPwd ? 'password' : 'text'"
        @click="hideErrorMessage"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'" 
            class="cursor-pointer"
            @click="isPwd=! isPwd"
          />
        </template>
      </q-input>

      <div id="errorMessage" v-if="!isHidden">
        <q-icon name="warning" class="text-red login__iconwarning" />
        <span>{{ errMsg }}</span>
      </div>

      <q-btn
        id="login__submit"
        class="q-my-md" 
        label="Reset Password"
        type="submit"
        color="primary"
        :loading="submitting"
      />
    </q-form>
  </div>
</template>

<style lang="scss">
// $
@import '../assets/css/login.scss';
</style>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      isHidden: true,
      isPwd: true,
      password: null,
      confirm_password: null,
      errMsg: '',
      submitting: false
    }
  },
  validations: {
    password: {
      required,
      minLength: minLength(5)
    },
    confirm_password: {
      required,
      minLength: minLength(5)
    }
  },

  methods: {
    hideErrorMessage () {
      this.isHidden = true;
    },
    loadData () {
      const url = 'statics/loginConfig.json';
      var email_address = (localStorage.getItem('auth')) ? localStorage.getItem('email') : '';
      const params = {
        email: email_address,
        password: this.password,
        auth_token: 'sampletoken101', // pre-defined data as per database
        company_id: 1                 // pre-defined data as per database
      };

      fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.email == params.email && data.password != params.password) {
          localStorage.removeItem('email');
          localStorage.removeItem('auth');
          this.$router.push({name: 'password-reset-success'});
        } else {
          this.isHidden = false;
          this.errMsg = "Request cannot be processed.";
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
