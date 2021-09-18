const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/static/index.html',
            title: 'Development'
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: "./src/**/*.tsx",
            },
        }),
    ],
    devtool: 'inline-source-map',
    devServer: {
        static: ['dist'],
        port: 3000,
        client: {
            overlay: true
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
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
                        '@babel/preset-typescript'
                    ]
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    }
};
