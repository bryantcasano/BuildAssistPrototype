<template>
  <q-layout view="hHh LpR fFf" style="overflow: hidden;" class="loginbg">
    <q-page-container>
        <div class="row">     
          <div class="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-xs-9 absolute-center login-info">
          <div class="login-logo-container col-lg-12"><img src="~assets/images/logo.png" class="login-logo" /></div>
                  <div>
          <span>Error 404 Content not found</span>
          <router-link to="/login">
            <q-btn id="login__submit" class="q-mt-md q-mb-lg" label="Back to Login " />
          </router-link>
          <p>If you still need help, contact <a href="mailto:support@test.com" class="login__mail">Support.</a></p>
                  </div>
          </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {}
</script>
<style lang="scss">
@import '../../../css/layouts/login-layout.scss';
</style>
<style lang="scss">
// $
@import '../../login/assets/css/login.scss';
</style>

<script>
export default {
  name: 'Error404'
}
</script>
