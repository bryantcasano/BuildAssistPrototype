<template>
    <div class="header">
        <router-link to="/">
          <img src="~assets/images/logo.png" class="header--img-logo" />
        </router-link>

        <!-- Search Start -->
        <div id="header--search-box">
          <q-input color="primary" outlined square dense v-model="searchtext" label="Type your search here..." class="q-ml-md header__search-input">
            <template v-slot:append>
              <q-icon v-if="searchtext === ''" class="search-icon" name="search" @click="searchtext = ''"/>
              <q-icon v-else name="cancel" class="cursor-pointer search-icon-cancel" @click="searchtext = ''" />
            </template>
          </q-input>
        </div>
        <!-- Search End -->
        <q-space class="none-space-mobile"/>
        <!-- Profile Start -->
        <div class="header--btn-dropdown">
          <q-btn-dropdown icon="img:statics/icons/profile-icon.svg">
            <ul class="header__q-list">       
              <router-link to="/profile"><li><q-icon name="fa fa-user" class="header-nav-icon-head"/>Profile</li></router-link>
              <router-link to="/diary"><li><q-icon name="fa fa-user-plus" class="header-nav-icon"/>Diary</li></router-link>
              <router-link to="/dashboard"><li><q-icon name="fa fa-desktop" class="header-nav-icon"/>Dashboard</li></router-link>
              <router-link to="/watchlist"><li><q-icon name="fa fa-file-alt" class="header-nav-icon"/>Watchlist</li></router-link>
              <router-link to="/status"><li><q-icon name="fa fa-chart-line" class="header-nav-icon"/>Status</li></router-link>
              <router-link to="/submit-ticket"><li><q-icon name="fa fa-flag" class="header-nav-icon"/>Submit Ticket</li></router-link>
              <q-separator class="sep-logout"/>
              <router-link v-on:click.native="logout" to="/"><li><q-icon name="fa fa-power-off" class="header-nav-icon"/>Logout</li></router-link>
            </ul>  
          </q-btn-dropdown>
        </div>
        <!-- Profile End -->
    </div>
</template>
<script>
export default {
  name: 'TheHeader',
  methods: {
    logout () {
      localStorage.removeItem('token');
      this.$router.push({name: 'login'});
    }    
  },  
  data () {
    return {
      searchtext: ''
    }
  }
}
</script>
<style lang="scss">
  // $
  @import '../css/components.scss';
  @import 'claimSummary/assets/css/claim-summary.scss';
</style>