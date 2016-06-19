var webpack = require('webpack');
var path = require('path')

var env = 'development';

module.exports = {
    name: 'client',
    entry: "./src/ReactListScroll.js",
    output: {
        path: __dirname,
        filename: "./dist/ReactListScroll.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env)
            }
        })
    ]
}