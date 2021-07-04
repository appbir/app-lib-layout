// 开发模式
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
    mode: 'development',
    devtool: 'inline-source-map',
    // entry:'./src/core/index.js', // old
    entry: {
        // demo02:'./demo/demo02/index.js',
        // demo03:'./demo/demo03/index.js',
        // demo04:'./demo/demo04/index.js',
        indexContainer:'./demo/demo04/indexContainer.js',
        
    },
    output: {
        filename: '[name].js',
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
   
    plugins: [
        new CleanWebpackPlugin(['../docs']), // 采用开发模式与发布模式编译的文件一直 最后发布的时候直接替换到原有的开发文件 避免发布的包过大
        new HTMLWebpackPlugin({ title: 'appbir_layout', template: './template.html' })
    ]
};

module.exports = config;