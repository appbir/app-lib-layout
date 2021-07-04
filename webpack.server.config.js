/**
 *  热启动服务
 */

/** **************************************************
 *                 基于webpack3的热启动
 * *************************************************
 */



// 开发模式
const path = require('path');
const webpack = require("webpack");

const HTMLWebpackPlugin = require('html-webpack-plugin');
const config = {
    devtool: 'inline-source-map',
    entry: {
        // 'demo04': path.join(__dirname, './example/demo/demo04/index.js'), // appbir-site使用案列
        // -----------简单的使用案列------------------------------------
        'demo10': path.join(__dirname, './example/demo/demo10/index.js'),
        'demo11': path.join(__dirname, './example/demo/demo11/index.js'),
    },
    output: {
        path:path.join(__dirname, './dist'),
        filename: '[name].js',
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", 'css-loader?importLoaders=1']
            },
            {
                test: /\.(less)$/,
                use: ["style-loader", 'css-loader?importLoaders=1', 'less-loader']
            },
            {
                test: /\.(png)|(jpg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 60000
                    }
                }]
            },
            {
                test: /\.(eot|svg|ttf|woff)/,
                use: {
                    loader: 'file-loader?name=fonts/[hash].[ext]',
                }
            }
        ]
    },
 
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 不用编写的后缀
        alias: {
            // 配置快捷使用
            "@layout": path.resolve(__dirname, './src/index.js'),
        }
    },
    mode: "development",
    devServer: {
        open: true,
        contentBase: 'src',
        port: 3002,
        hot: true   // 1.要使用hot，首先将hot设置为true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HTMLWebpackPlugin({
            template: './example/template.html' // 使用模版
        }),
        new webpack.HotModuleReplacementPlugin() 
        // new UglifyJsPlugin(), //  TypeError: Cannot read property 'compilation' of undefined
    ],

};

module.exports = config;