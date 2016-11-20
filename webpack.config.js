const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const EXCLUDE = /(node_modules|bower_components)/;

module.exports = {
  entry: {
    npmGuiWebClient: ['babel-polyfill', './index.js'],
  },
  output: {
    path: `${__dirname}/dist`,
    filename: './[name].js',
  },
  watchOptions: {
    poll: 1000,
  },
  devtool: '#eval-source-map',
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        exclude: EXCLUDE,
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: EXCLUDE,
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: EXCLUDE,
      }, {
        test: /\.css/,
        loaders: ['style', 'css'],
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      }, {
        test: /\.vue/,
        loader: 'vue',
      }, {
        test: /\.(png|woff|woff2|eot|otf|ttf|svg|gif|jpg)/,
        loader: 'url?limit=1000',
      },
    ],
  },
  vue: {
    loaders: {
      scss: 'vue-style-loader!css-loader!sass-loader',
      postcss: 'vue-style-loader!css-loader',
    },
    postcss: [
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ],
  },
  resolve: {
    modulesDirectories: ['web_modules', 'node_modules', 'npm-gui_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'NPM-GUI',
      template: 'index.template.html',
      chunks: ['npmGuiWebClient'],
      hash: true,
      mobile: true,
    }),
    new StyleLintPlugin({
      files: ['**/*.s?(a|c)ss', '**/*.vue'],
      syntax: 'scss', // without it build will throw error
    }),
  ],
};
