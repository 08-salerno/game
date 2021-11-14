import webpack from 'webpack';
import path from 'path';
import webpackNodeExternals from 'webpack-node-externals';
import { merge } from 'webpack-merge';
import webpackConfigBase from './webpack.config';

module.exports = (_: never, argv: Record<string, never>): webpack.Configuration => {
  const mode: webpack.Configuration['mode'] = argv.mode || 'development';
  const baseConfig = webpackConfigBase(mode);

  return merge(baseConfig, {
    target: 'node',
    entry: {
      server: './src/server.tsx',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
    },
    externals: [webpackNodeExternals()],
  });
};
