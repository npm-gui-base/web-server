import VueRouter from 'vue-router';

import NpmGuiDependencies from './components/npm-gui-dependencies.vue';

const router = new VueRouter({
  // mode: 'history',
  routes: [{
    path: '/dependencies/regular',
    name: 'dependencies-regular',
    component: NpmGuiDependencies,
    meta: {
      api: 'dependencies/regular',
    },
  }, {
    path: '/dependencies/dev',
    name: 'dependencies-dev',
    component: NpmGuiDependencies,
    meta: {
      api: 'dependencies/dev',
    },
  }, {
    path: '/dependencies/global',
    name: 'dependencies-global',
    component: NpmGuiDependencies,
    meta: {
      api: 'dependencies/global',
    },
  }],
});

export default { router, VueRouter };
