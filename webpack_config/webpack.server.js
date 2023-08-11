const nodeExternals = require('webpack-node-externals');
const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const {
    serverEntry,
    serverOutput,
    nodeModules,
    formatDefine,
} = require('./utils');

module.exports = {
    entry: serverEntry,
    output: {
        filename: 'server.js',
        path: serverOutput
    },
    module: {
        rules: [
            {
                test: [/\.ts$/, /\.tsx$/],
                use: ['babel-loader'],
                // exclude: nodeModules,
            },
            {
                test: /\.less$/,
                use: ['isomorphic-style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: "[path][name]__[local]--[hash:base64:5]"
                        },
                        importLoaders: 1,
                        esModule: false,
                    }
                }, {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            javascriptEnabled: true,
                            modifyVars: {
                                'primary-color': '#FFA553'
                            }
                        }
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ttf$/, /\.TTF$/, /\.svg$/, /\.mp3$/],
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 512,
                        outputPath: 'assets'
                    }
                }],
                dependency: { not: ['url'] },
                type: 'javascript/auto',
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.json', '.js'],
        alias: {'@': path.resolve(__dirname, '../src')}
    },
    plugins: [
        new NodemonPlugin({
            script: './dist/server/server.js',
            watch: path.resolve('./dist/server'),
        })
    ],
    devtool: false,
    mode: 'development',
    target: 'node',
    externals: [nodeExternals()],
}