const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].js?[chunkhash]',
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],

    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({template: './index.html'}),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },
    /*devServer: {
        publicPath: '/',
        disableHostCheck: true,
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, './dist/'),
        hot: true,
        watchOptions: {
            aggregateTimeout: 100
        }
    }*/
}