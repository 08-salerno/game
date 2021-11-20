import webpack from 'webpack';
import { resolve } from 'path';
import webpackNodeExternals from 'webpack-node-externals';
import { merge } from 'webpack-merge';
import webpackConfigBase from './webpack.config';

module.exports = (): webpack.Configuration => {
  const baseConfig = webpackConfigBase();

  return merge(baseConfig, {
    target: 'node',
    // для ssr бандла если
    entry: './src/bundle.ts',
    // entry: { bundle: './src/server.tsx' },
    plugins: [
      new webpack.ProvidePlugin({
        document: 'global/document',
      }),
    ],
    output: {
      // для ssr бандла если
      filename: `ssr.bundle.js`,
      path: resolve(__dirname, 'dist/'),
    },
    externals: [webpackNodeExternals()],
  });
};
