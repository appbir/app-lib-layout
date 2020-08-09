// 开发模式
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
    mode:'development',
    devtool: 'inline-source-map',
    // entry:'./src/core/index.js', // old
    entry:'./demo02/index.js',
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
                        presets: ['env', 'react','stage-0'],
                        plugins: [require('babel-plugin-transform-object-rest-spread')]
                    }
                },                
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'demo02')
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
        new HTMLWebpackPlugin({title: 'appbir_layout',template:'./template.html'})
    ]
};

module.exports = config;