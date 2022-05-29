const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname,"./src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].[fullhash].js",
    clean: true,
  },
  devServer: {
    historyApiFallback: true,
    static: "./",
    hot:true,
    open: true,
  },
  stats: {
    errorDetails: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css", //creates css folder and puts .css files
    }),
  ],
  resolve: {
    modules: [__dirname, "src", "node_modules"],
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
      },
      {
        test:  /\.(s(a|c)ss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/css/",
            },
          },
          "css-loader", 
          "sass-loader"],
      },
      {
        test: /\.png|svg|pdf|jpg|gif$/,
        use: [
          {
            loader:"file-loader",
            options: 
            {
              outputPath: 'images/',
              name: '[name].[ext]',
              publicPath: '/images/'
            }
          }
        ],  
      },
    ],
  },
};