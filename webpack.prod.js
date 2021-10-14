const { merge } = require('webpack-merge');
const { DefinePlugin } = require('webpack');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new DefinePlugin({
      PRODUCTION: JSON.stringify(true),
    }),
  ],
});
