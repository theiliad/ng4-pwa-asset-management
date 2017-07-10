var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var commonConfig = require("./webpack.common.js");
var helpers = require("./helpers");

const ENV = process.env.ENV = "prod";

const PUBLIC_PATH = "/";

module.exports = webpackMerge(commonConfig, {
    devtool: "source-map",

    output: {
        path: helpers.root("dist"),
        publicPath: PUBLIC_PATH,
        filename: "[name].[hash].js",
        chunkFilename: "[id].[hash].chunk.js"
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin("[name].[hash].css"),
        new webpack.DefinePlugin({
            "process.env": {
                "ENV": JSON.stringify(ENV)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                htmlLoader: {
                    minimize: false
                }
            }
        }),
        new SWPrecacheWebpackPlugin(
            {
                cacheId: 'my-project-name',
                dontCacheBustUrlsMatching: /\.\w{8}\./,
                filename: 'service-worker.js',
                minify: false,
                navigateFallback: PUBLIC_PATH,
                staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
                runtimeCaching: [{
                    // urlPattern: /node-hnapi\.herokuapp\.com/,
                    urlPattern: /^https?:\/\/(localhost:([0-9]+\.)+[a-zA-Z0-9]{1,6})?$/,
                    handler: 'networkFirst'
                }]
            }
        )
    ]
});