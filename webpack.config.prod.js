const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: "development",
    entry: {
        app: "./src/index.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },
    resolve: {
        alias: {
            "three.module.js": path.join(
                __dirname,
                "node_modules/three/build/three.module.js"
            ),
        },
    },
    module: {
        rules: [
            // {
            //   test: /\.(gltf)$/,
            //   use: [
            //     {
            //       loader: "gltf-webpack-loader"
            //     }
            //   ]
            // },
            // {
            //   test: /\.(bin|png|svg|jpeg)$/,
            //   use: [
            //     {
            //       loader: "file-loader",
            //       options: {
            //         name: '[name].[ext]'
            //       }
            //     },
            //   ],
            // },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000, // if less than 10 kb, add base64 encoded image to css
                        name: "font/[name].[ext]", // if more than 10 kb move to this folder in build using file-loader
                    },
                }, ],
            },
            {
                test: /\.js?$/,
                exclude: [/node_modules/, path.resolve(__dirname, "src/3d-obj-loader")],
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            // {
            //   test: /\.scss$/i,
            //   use: [
            //     // Creates `style` nodes from JS strings
            //     "style-loader",
            //     // Translates CSS into CommonJS
            //     "css-loader",
            //     // Compiles Sass to CSS
            //     "sass-loader",
            //   ],
            // },
            // {
            //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            //   use: [
            //     {
            //       loader: "file-loader",
            //       options: {
            //         name: "./font/[hash].[ext]",
            //       },
            //     },
            //   ],
            // },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Hot Module Replacement",
            template: path.join(path.resolve(__dirname, "."), "/", "index.html"),
            minify: {
                collapseWhitespace: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: "3d-obj-loader/**/*",
            }, ],
        }),
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            /* Minfy JS */
            new TerserPlugin({
                terserOptions: {
                    parallel: true,
                    warnings: false,
                    output: {
                        comments: false,
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    compress: {
                        drop_console: true, // Set to true on Production
                    },
                    extractComments: false,
                    ie8: false,
                    safari10: true,
                },
                sourceMap: false,
            }),
        ],
    },
};