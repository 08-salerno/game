import webpack from 'webpack';
import { resolve } from 'path';
import webpackNodeExternals from 'webpack-node-externals';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import webpackConfigBase from './webpack.config';

module.exports = (): webpack.Configuration => {
  const baseConfig = webpackConfigBase();

  return merge(baseConfig, {
    target: 'node',
    // для ssr бандла если
    // entry: './src/index.tsx',
    entry: { server: './src/server.tsx' },
    plugins: [
      new CleanWebpackPlugin(),
      new webpack.ProvidePlugin({
        document: 'global/document',
      }),
    ],
    output: {
      // для ssr бандла если
      // filename: `ssr.bundles.js`,
      path: resolve(__dirname, 'dist/server'),
      clean: true,
    },
    externals: [webpackNodeExternals()],
  });
};
