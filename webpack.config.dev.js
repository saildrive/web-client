var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, "./src/javascript/index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    "presets": ["es2015", "react"]
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css", "sass"]
            },
            {   
                test: /\.svg$/, 
                loader: 'babel?presets[]=es2015,presets[]=react!svg-react' 
            },
            {
                test: /\.(png|woff|woff2|eot|ttf)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Sea Drive",
            inject: "body",
            template: "./src/html/index.hbs"
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev')
        }),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 4000
    },
};
