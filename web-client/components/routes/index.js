import NpmGuiDependencies from '../npm-gui-dependencies';

export default [{
  path: '/dependencies',
  name: 'dependencies',
  component: NpmGuiDependencies,
  meta: {
    api: 'dependencies',
  },
}, {
  path: '/dev-dependencies',
  name: 'dev-dependencies',
  component: NpmGuiDependencies,
  meta: {
    api: 'dependencies-dev',
  },
}, {
  path: '/global-dependencies',
  name: 'global-dependencies',
  component: NpmGuiDependencies,
  meta: {
    api: 'global',
  },
}];
