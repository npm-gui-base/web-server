import 'normalize.css';
import Vue from 'vue';
import 'open-iconic';

import './base.css';
import NpmGuiNav from './components/npm-gui-nav';
import NpmGuiConsole from './components/npm-gui-console';

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

// export default {
//   initialize,
//   Vue,
// };
