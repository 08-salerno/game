const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.tsx',
      },
    }),
  ],
  devtool: 'source-map',
  devServer: {
    static: ['dist'],
    port: 3000,
    client: {
      overlay: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
  }
});
