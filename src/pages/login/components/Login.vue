<template>
  <div class="q-pa-sm">

    <!-- Start of Login -->
    <q-form @submit.prevent="loadData" class="q-gutter-md">
      <q-input
        v-model.trim="username"
        label="Username"
        borderless
        dense
        class="login__input q-mt-md q-mb-lg"
        @input="$v.username.$touch()"
        :rules="[ 
          val => $v.username.required || 'This field is required'
        ]"
        @click="hideErrorMessage"
      />

      <q-input
        v-model="password"
        label="Password"
        borderless
        dense
        class="login__input q-my-sm"
        :rules="[ 
          val => val !== null && val !== '' || 'This field is required',
          val => val.length >= 5 || 'Minimum length should be at least 5 characters'
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
        class="q-mt-md"
        label="Login"
        type="submit" 
        color="primary"
        :loading="submitting"
      >
        <template v-slot:loading>
          <q-spinner-facebook ></q-spinner-facebook>
        </template>
      </q-btn>

      <div class="col-md-12">
        <div class="row">
          <div class="login-bottom q-pr-md">
            <q-checkbox v-model="remember" label="Remember me" class="login__text" color="green" />
          </div>
          <div class="login-bottom">
            <q-icon class="far fa-question-circle login__forgoticon" />
            <router-link to="/forgot-password" class="login__text">Forgot Password?</router-link>
          </div>
        </div>
      </div>
    </q-form>
    <!-- End of Login -->

  </div>
</template>

<style lang="scss">
// $
@import '../assets/css/login.scss';
</style>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      isHidden: true,
      isPwd: true,
      username: null,
      password: null,
      remember: true,
      errMsg: '',
      submitting: false,
      remember: false
    }
  },
  validations: {
    username: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(5)
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
      var remember_me = (this.remember === true) ? 1 : 0;
      const params = {
        username: this.username,
        password: this.password,
        remember: remember_me
      };

      fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.username == params.username && data.password == params.password) {
          localStorage.setItem('token', 'dummyt0k3n');
          this.$router.push({name: 'diary'});
        } else {
          this.isHidden = false;
          this.errMsg = "Invalid credentials.";
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
