const DefinePlugin = require('webpack').DefinePlugin;
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const {
    clientEntry,
    clientOutput,
    nodeModules,
    formatDefine,
} = require('./utils');


module.exports = {
    entry: clientEntry,
    output: {
        filename: 'bundle.js',
        path: clientOutput
    },
    module: {
        rules: [
            {
                test: [/\.ts$/, /\.tsx$/],
                use: ['babel-loader'],
                // exclude: nodeModules
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
                use: ['isomorphic-style-loader', 'css-loader'],
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
        new DefinePlugin(formatDefine({
            MXC_ENV: process.env.MXC_ENV,
        })),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
        }),
    ],
    devtool: false,
    mode: 'development',
}