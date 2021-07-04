const path = require('path');
const DEV_ENV = (process.argv.indexOf("-p") < 0);
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        "app-layout": './src/index',
        'app-layout-demo': './example/demo/demo04/demo/index.jsx',
    },
    output: {
        filename: DEV_ENV ? "[name].js" : "[name].min.js",
        path: path.resolve(__dirname, 'dist/umd/'),
        library: "[name]",
        libraryTarget: "umd"
    },
    // externals: {
    //     react: "react",
    //     'react-dom':'react-dom'
    // },
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
                path.join(__dirname, 'src'),
                path.join(__dirname, 'example')
            ],
            // exclude: /(aaa)/
            exclude: /(node_modules)/

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
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // new CleanWebpackPlugin(['./docs/']), // 文件路径一定在工程内部  否则不能删除
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        new UglifyJsPlugin(),
    ],
    devtool: "source-map",
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 不用编写的后缀
        alias: {
            // 配置快捷使用
            "@layout": path.resolve(__dirname, './src/index.js'),
        }
    },
    
}