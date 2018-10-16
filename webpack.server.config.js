const nodeExternals = require('webpack-node-externals'); // eslint-disable-line

const EXCLUDE = /(node_modules|bower_components)/;

module.exports = {
  entry: './server/index.js',
  output: {
    library: 'npmGuiServer',
    libraryTarget: 'umd',
    path: `${__dirname}/dist/server`,
    filename: './[name].js',
  },
  watchOptions: {
    poll: 1000,
  },
  devtool: 'cheap-source-map',
  target: 'node',
  externals: [[nodeExternals()]], // webpack will ommit all packages, we dont want it on production
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
        exclude: EXCLUDE,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: EXCLUDE,
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
  },
};
