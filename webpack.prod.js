"use strict";
const path = require("path");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
var WebpackCleanPlugin = require("webpack-clean");
var SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");

module.exports = {
  devtool: "source-map",
  entry: "./src/index.scss",
  output: {
    path: buildPath,
    filename: "[name]"
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          MiniCssExtractPlugin.loader,

          {
            // translates CSS into CommonJS
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // Runs compiled CSS through postcss for vendor prefixing
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader",
            options: {
              outputStyle: "expanded",
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      inlineSource: ".(css)$"
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css"
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new CleanWebpackPlugin(buildPath),
    new CopyWebpackPlugin([
      { from: "./src/assets", to: "assets" },
      { from: "./src/CNAME", to: "CNAME", toType: "file" }
    ]),
    new WebpackCleanPlugin(["dist/main", "dist/styles.css"]),
    new SWPrecacheWebpackPlugin({
      cacheId: "amitsarangi.me",
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: "service-worker.js",
      minify: true,
      navigateFallback: "index.html",
      staticFileGlobsIgnorePatterns: [
        /\.map$/,
        /asset-manifest\.json$/,
        /main/,
        /CNAME/,
        /\.css$/
      ]
    })
  ]
};
