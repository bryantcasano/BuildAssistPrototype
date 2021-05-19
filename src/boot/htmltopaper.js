import Vue from 'vue';
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons',
    'https://cdn.jsdelivr.net/npm/quasar@1.9.11/dist/quasar.min.css',
  ]
}

Vue.use(VueHtmlToPaper, options);