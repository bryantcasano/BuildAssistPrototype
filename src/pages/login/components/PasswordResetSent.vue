<template>
  <div>
    <p class="q-my-md login-heading">Password reset email sent.</p>
    <span>An email instruction has been sent to your email address regarding the resetting of your account password.</span>
     <router-link to="/login">
      <q-btn id="login__submit" class="q-mt-md q-mb-lg" label="Back to Login" />
     </router-link>
    <p>If you still need help, contact <a href="mailto:support@test.com" class="login__mail">Support.</a></p>
  </div>
</template>

<style lang="scss">
// $
@import '../assets/css/login.scss';
</style>

<script>
export default {
  data() {
    return {
      remember: true,
      no: false,
      password: '',
      isPwd: true

    }
  }
}
</script>
