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
      // todo [sitnik] сборка ssr дополнительно генерит папку dist/assets из-за дефолтного конфига
      //   но если добавить здесь dist/client, то лишних ассетов не будет
      //   но запросы за ними почему не будут по пути /client/assets
      //   а останутся на /assets
      path: resolve(__dirname, 'dist/'),
      library: {
        type: 'commonjs2',
      },
    },
    externals: [webpackNodeExternals()],
  });
};
