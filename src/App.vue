<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  meta: {
    title: 'Project Phoenix',
    titleTemplate: title => `${title} | Project Phoenix`, 
    meta: {
      equiv: { 'http-equiv': 'Content-Security-Policy', 'content': 'frame-src \'self\' \'unsafe-eval\'' },
      equiv: { 'http-equiv': 'Content-Security-Policy', 'content': 'frame-src https://www.google.com/'}
    }
  },
}

import Vue from 'vue'

fetch('statics/runtimeConfig.json').then(response => {
  return response.json();
}).then(data => {
  Vue.mixin({
    data() {
      return {
        API_URL: data.API_URL
      }
    },
  });
});

</script>
