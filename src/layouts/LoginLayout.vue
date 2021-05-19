<template>
  <q-layout view="hHh LpR fFf" style="overflow: hidden;" class="loginbg">
    <q-page-container>
        <div class="row">     
          <div class="absolute-center login-info">
          <div class="login-logo-container col-lg-12"><img src="~assets/images/logo.png" class="login-logo" /></div>
            <router-view />
          </div>
      </div>
    </q-page-container>
  </q-layout>
</template>
<script>
export default {}
</script>
<style lang="scss">
@import '../css/layouts/login-layout.scss';
</style>
