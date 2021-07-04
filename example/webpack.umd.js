// 开发模式
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const config = {
    devtool: "source-map",
    entry: {
        // index: './demo/demo02/test.js',
        // index: './demo/demo03/index.js',
        'app-layout-demo': './demo/demo04/demo/index.jsx',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist/umd'),
        library: "[name]",
        libraryTarget: "umd"
    },
    devServer: {
        contentBase: './dist',
        port: 8088
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react', 'stage-0'],
                    plugins: [require('babel-plugin-transform-object-rest-spread')]
                }
            },
            include: [
                path.join(__dirname, 'demo')
            ],
            exclude: /(aaa)/
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.less$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }]
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {}
            }]
        },
        {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=50000&name=[path][name].[ext]'
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 不用编写的后缀
        alias: {
            // 配置快捷使用
            "@layout": path.resolve(__dirname, '../src/index.js'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(['./docs/']), // 文件路径一定在工程内部  否则不能删除
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        new UglifyJsPlugin(),
        // new HTMLWebpackPlugin({ title: 'appbir_layout', template: './template.html' })
    ]
};

module.exports = config;