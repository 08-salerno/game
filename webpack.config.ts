import webpack from 'webpack';

export default (): webpack.Configuration => ({
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
      {
        test: /\.wav$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
});
