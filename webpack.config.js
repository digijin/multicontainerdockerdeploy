var path = require("path");

var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WriteFilePlugin = require("write-file-webpack-plugin");

var dir_js = path.resolve(__dirname, "src");
var dir_html = path.resolve(__dirname, "html");
var dir_build = path.resolve(__dirname, "dist");
var dir_spec = path.resolve(__dirname, "test");

module.exports = {
  context: __dirname + "/src/client",
  entry: "./entry",
  output: {
    path: __dirname + "/dist/client",
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  devServer: {
    outputPath: dir_build
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        test: /\.js/,
        exclude: [/\.spec\.js/, /node_modules/]
      },
      {
        loader: "babel-loader",
        test: /\.spec\.js/
      },
      {
        test: /\.html$/,
        loader: "html"
      },
      {
        test: /\.png$/,
        loader: "file-loader?publicPath=/"
      },
      {
        test: /\.styl$/,
        // loader: "style-loader!css-loader!stylus-loader"
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader!stylus-loader"
        )
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(ttf|eot|svg|TTF|woff2|woff)$/,
        loader: "file-loader?publicPath=/"
      }
    ]
  },
  plugins: [
    new WriteFilePlugin(),
    // Simply copies the files over
    new CopyWebpackPlugin(
      [
        // { from: dir_html } // to: output.path
      ]
    ),
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("[name].css")
  ],
  resolve: {
    root: path.join(process.cwd(), "src"),
    extensions: ["", ".js"]
  }
};
