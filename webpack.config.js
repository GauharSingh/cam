const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

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
                test: /\.(woff|woff2|eot|ttf)$/,
                exclude: [path.resolve(__dirname, "src/3d-obj-loader")],
                loader: "url-loader?limit=100000",
            },
            {
                test: /\.js?$/,
                exclude: [/node_modules/],
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
        // new CopyWebpackPlugin({
        //     patterns: [{
        //         from: "src/3d-obj-loader/**/*",
        //     }, ],
        // }),
    ],
    devServer: {
        port: 3001,
        hot: true,
    },
};