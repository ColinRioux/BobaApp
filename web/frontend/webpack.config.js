const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const PnpWebpackPlugin = require('pnp-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname),
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src'),
            '~': path.resolve(__dirname)
        },
        extensions: ['*', '.js', '.vue', '.json'],
        plugins: [ PnpWebpackPlugin ]
    },
    resolveLoader: {
        plugins: [ PnpWebpackPlugin.moduleLoader(module) ]
    },
    devServer: {
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: require.resolve('babel-loader')
            },
            {
                test: /\.m?jsx?$/,
                loader: require.resolve('babel-loader')
            },
            {
                test: /\.vue$/,
                loader: require.resolve('vue-loader')
            },
            {
                test: /\.css$/,
                loader: [
                    require.resolve('vue-style-loader'),
                    require.resolve('css-loader'),
                    require.resolve('postcss-loader')
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin(
            {
                template: './public/index.html'
            }
        )
    ]
}