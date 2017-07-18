module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  // plugins: [
  //   'html'
  // ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.config.js'
      }
    }
  },
  global: {
    describe: true,
    it: true,
  }
  // add your custom rules here
  // rules: {
  //   // allow debugger during development
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  // }
}
