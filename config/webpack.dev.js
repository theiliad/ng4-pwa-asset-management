var webpackMerge = require("webpack-merge");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var commonConfig = require("./webpack.common.js");
var helpers = require("./helpers");

const PUBLIC_PATH = "http://localhost:3000/";

module.exports = webpackMerge(commonConfig, {
    devtool: "cheap-module-eval-source-map",

    output: {
        path: helpers.root("dist"),
        publicPath: PUBLIC_PATH,
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    plugins: [
        new ExtractTextPlugin("[name].css"),

        new SWPrecacheWebpackPlugin(
            {
                cacheId: 'my-project-name',
                dontCacheBustUrlsMatching: /\.\w{8}\./,
                filename: 'service-worker.js',
                minify: true,
                navigateFallback: PUBLIC_PATH + 'index.html',
                staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
            }
        )
    ],

    devServer: {
        historyApiFallback: true,
        stats: "minimal"
        /*,
        proxy: {
            "/api/**": {
                target: "http://localhost:9898/api",
                secure: false,
                changeOrigin: true
            }
        }*/
    }
});