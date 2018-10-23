import NpmGuiDependencies from './components/npm-gui-dependencies.vue';

export const routes = [{
  path: '/project/:projectPathEncoded',
  component: { template: '<router-view></router-view>' },
  children: [{
    path: 'dependencies/regular',
    name: 'dependencies-regular',
    component: NpmGuiDependencies,
    meta: {
      api: 'dependencies/regular',
    },
  }, {
    path: 'dependencies/dev',
    name: 'dependencies-dev',
    component: NpmGuiDependencies,
    meta: {
      api: 'dependencies/dev',
    },
  }, {
    path: 'dependencies/global',
    name: 'dependencies-global',
    component: NpmGuiDependencies,
    meta: {
      api: 'dependencies/global',
    },
  }],
}];
