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
  rules: {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "import/prefer-default-export": "warning"
  },
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.config.js'
      }
    }
  },
}
