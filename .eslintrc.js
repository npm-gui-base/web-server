module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.config.js'
      }
    }
  },
  globals: {
    describe: true,
    xdescribe: true,
    fdescribe: true,
    it: true,
    xit: true,
    fit: true,
    before: true,
    beforeEach: true,
  }
  // add your custom rules here
  // rules: {
  //   // allow debugger during development
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  // }
}
