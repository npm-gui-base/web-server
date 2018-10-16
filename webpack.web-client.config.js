const HtmlWebpackPlugin = require('html-webpack-plugin'); // eslint-disable-line
// const autoprefixer = require('autoprefixer'); // eslint-disable-line
// const StyleLintPlugin = require('stylelint-webpack-plugin'); // eslint-disable-line

const EXCLUDE = /(node_modules|bower_components)/;

module.exports = {
  entry: {
    npmGuiWebClient: ['babel-polyfill', './client/index.js'],
  },
  output: {
    path: `${__dirname}/dist/client`,
    filename: './[name].js',
  },
  watchOptions: {
    poll: 1000,
  },
  devtool: 'cheap-source-map',
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          // fix: true,
          plugins: ['html'],
        },
        exclude: EXCLUDE,
      },
      {
        test: /\.(js|vue)$/,
        loader: 'babel-loader',
        exclude: EXCLUDE,
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      }, {
        test: /\.(png|woff|woff2|eot|otf|ttf|svg|gif|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
          },
        },
      }, {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  // vue: {
  //   loaders: {
  //     scss: 'vue-style-loader!css-loader!sass-loader',
  //     postcss: 'vue-style-loader!css-loader',
  //   },
  //   postcss: [
  //     autoprefixer({
  //       browsers: ['last 2 versions'],
  //     }),
  //   ],
  // },
  resolve: {
    modules: ['node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'NPM-GUI',
      template: 'client/index.template.html',
      chunks: ['npmGuiWebClient'],
      hash: true,
      mobile: true,
    }),
    // new StyleLintPlugin({
    //   files: ['**/*.s?(a|c)ss', '**/*.vue'],
    //   syntax: 'scss', // without it build will throw error
    // }),
  ],
  devServer: {
    compress: true,
    port: 9000,
    proxy: [
      {
        context: ['/api/**'],
        target: 'http://localhost:9002/',
        secure: false,
        ws: true,
      },
    ],
  },
};
