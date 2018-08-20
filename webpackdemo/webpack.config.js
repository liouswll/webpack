const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require("webpack");
module.exports = {
    entry: {
        index: "./scripts/index.js"
    },
    output: {
        filename: "[name].bundle.[hash].js",//"[name].bundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use:[{
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',
                        limit: 5000
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
           filename: 'index.html',
           template: './index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin()
    ],
    /*optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    name: "common",
                    minChunks: 2,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10
                }
            }
        }
    }*/
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {  // 抽离自己写的公共代码
                    chunks: "initial",
                    name: "common", // 打包后的文件名，任意命名
                    minChunks: 2,//最小引用2次
                    minSize: 0 // 只要超出0字节就生成一个新包
                },
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
            }
        }
    },
    devServer: {
        inline:true,
        hot:true,
        contentBase: path.resolve(__dirname,'dist'),
        host: 'localhost',
        port: 9090,
        compress: true
    }
};