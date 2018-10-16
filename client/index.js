import 'normalize.css';
import Vue from 'vue/dist/vue.js';

import './base.scss';
import NpmGuiNav from './components/npm-gui-nav';
import NpmGuiConsole from './components/npm-gui-console';

import router from './router';

Vue.use(router.VueRouter);

function initialize() {
  const app = new Vue({ // eslint-disable-line
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

export default {
  initialize,
  Vue,
};
