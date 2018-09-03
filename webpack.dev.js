const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "eval-cheap-module-source-map",
  entry: "./src/index.scss",
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // creates style nodes from JS strings
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // translates CSS into CommonJS
            loader: "css-loader",
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
          // Please note we are not running postcss here
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ]
};
