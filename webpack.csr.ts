import webpack, { DefinePlugin } from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { merge } from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpackConfigBase from './webpack.config';

module.exports = (_: never, argv: Record<string, never>): webpack.Configuration => {
  const mode: webpack.Configuration['mode'] = argv.mode || 'development';
  const isProd = mode !== 'development';
  const baseConfig = webpackConfigBase();

  const prodConfig = {
    plugins: [
      new DefinePlugin({
        PRODUCTION: JSON.stringify(true),
      }),
    ],
  };

  const devConfig = {
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        eslint: {
          files: './src/**/*.tsx',
        },
      }),
      new DefinePlugin({
        PRODUCTION: JSON.stringify(false),
      }),
    ],
    devtool: 'source-map',
    devServer: {
      port: 3000,
      hot: false,
      client: {
        overlay: false,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      historyApiFallback: true,
    },
  };

  return merge(baseConfig, {
    entry: {
      app: './src/index.tsx',
      'service-worker': './src/modules/service-worker/service-worker.ts',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/static/index.html',
        title: '08-salerno',
        excludeChunks: ['service-worker'],
      }),
      new CleanWebpackPlugin(),
    ],
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist/client'),
      clean: true,
      publicPath: '/',
    },
  }, isProd ? prodConfig : devConfig);
};
