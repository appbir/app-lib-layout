const path = require('path');
const DEV_ENV = (process.argv.indexOf("-p") < 0);
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        "app-layout": './src/index'
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
                path.join(__dirname, 'src')
            ],
            // exclude: /(aaa)/
            exclude: /(node_modules)/

        },
        {
            test: /\.css$/,
            use: ["style-loader", 'css-loader?importLoaders=1']
        },
        {
            test: /\.(less)$/,
            use: ["style-loader", 'css-loader?importLoaders=1', 'postcss-loader', 'less-loader']
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
        // new UglifyJsPlugin(), //  TypeError: Cannot read property 'compilation' of undefined
    ],
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
    }
}