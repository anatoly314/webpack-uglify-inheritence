/**
 * Created by Elad Hartsak on 17-Dec-17.
 */
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const fs = require('fs');

const nodeModules = {};
const localDependencies = ['.bin'];
fs.readdirSync('node_modules')
    .filter(function (x) {
        return localDependencies.indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

try {


    module.exports = {
        target: 'node',
        node: {
            console: false,
            global: false,
            process: false,
            Buffer: false,
            __filename: true,
            __dirname: true
        },

        entry: './index.js',

        output: {
            path: path.join(__dirname, 'build'),
            filename: 'index.js'
        },

        externals: nodeModules,
        plugins: [
            new webpack.IgnorePlugin(/\.(css|less)$/),
            new webpack.BannerPlugin({
                banner: 'require("source-map-support").install();',
                raw: true,
                entryOnly: false
            })
        ],
        devtool: 'sourcemap',

        module: {
            loaders: [
                {test: /\.json$/, loader: "json-loader"}
            ]
        },

        plugins: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false
                    },
                    keep_classnames: false,
                    mangle: true,
                    output: {
                        beautify: true
                    }
                }
            })
        ]
    };
}
catch (e) {
    console.error(e);
}