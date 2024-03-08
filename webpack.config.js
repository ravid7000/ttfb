const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: isDev ? "bundle.js" : "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    isDev
      ? new MiniCssExtractPlugin()
      : new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
        }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // .js and .jsx files
        include: path.resolve(__dirname, "src"), // limiting the rule to a specific folder
        exclude: /node_modules/, // excluding the node_modules folder
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  optimization: isDev
    ? {}
    : {
        moduleIds: "deterministic",
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
            },
          },
        },
        runtimeChunk: "single",
        usedExports: true,
      },
  devServer: {
    port: 9000,
    hot: true,
  },
};
