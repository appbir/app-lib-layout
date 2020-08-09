// 开发模式
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        index: './src/core/index.js',
        'c-react': ['react', 'react-dom'],
        'c-redux': [
            'redux',
            'redux-immutable',
            'redux-immutable-reducer',
            'redux-logger',
            'redux-thunk',
            'redux-undo'
        ],
        'antd':['antd']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../docs')
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
                path.join(__dirname, 'src')
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
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          }),
        new UglifyJsPlugin(),
        new HTMLWebpackPlugin({ title: 'appbir_layout', template: './template.html' })
    ]
};

module.exports = config;