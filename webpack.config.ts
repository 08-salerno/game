import webpack from 'webpack';

export default (mode: webpack.Configuration['mode']): webpack.Configuration => ({
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
          ],
        },
      },
      {
        test: /\.png$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
});
