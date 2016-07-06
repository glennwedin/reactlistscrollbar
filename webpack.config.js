var webpack = require('webpack');
var path = require('path');

module.exports = {
    name: 'client',
    entry: "./src/ReactListScroll.js",
    output: {
        path: __dirname,
        filename: "./dist/ReactListScroll.js",
        libraryTarget: "umd"
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
    externals: [
        {
            "react": {
                root: "React",
                commonjs2: "react",
                commonjs: "react",
                amd: "react"
            },
            "react-dom": {
                root: "ReactDOM",
                commonjs2: "react-dom",
                commonjs: "react-dom",
                amd: "react-dom"
            }
        }
    ]
}
