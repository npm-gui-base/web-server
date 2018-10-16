import NpmGuiDependencies from '../npm-gui-dependencies';

export default [{
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
}];
