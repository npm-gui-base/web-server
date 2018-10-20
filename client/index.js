import 'normalize.css';
import Vue from 'vue';
import 'open-iconic'; // eslint-disable-line

import './base.css';
import NpmGuiNav from './components/npm-gui-nav.vue';
import NpmGuiConsole from './components/npm-gui-console.vue';

import router from './router';

Vue.use(router.VueRouter);

function initialize() {
  const app = new Vue({
    el: '#npm-gui-vue',
    components: {
      NpmGuiNav,
      NpmGuiConsole,
    },
    router: router.router,
  });

  return app;
}

initialize();
