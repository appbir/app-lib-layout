const path = require('path');
const DEV_ENV = (process.argv.indexOf("-p") < 0);
module.exports = {
    entry: {
        "app-layout-bundle": './src/bundle.js'
    },

    output: {
        filename: DEV_ENV?"[name].js":"[name].min.js",
        path: path.resolve(__dirname, 'dist/bundle'),
        library:"[name]",
        libraryTarget:"umd"
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
            }
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
        }]
    },
    plugins: [
    ],

    devtool: "source-map",

    watch: false,

    resolve: {
        extensions: [".js", ".json", ".jsx", ".css"],
    }
}