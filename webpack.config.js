const path = require("path");
const webpack = require("webpack");
const base = require("./webpack.base");

module.exports = (env) => {
  const baseConfig = base.config(env, webpack);
  const config = {
    ...baseConfig,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: [
            /node_modules/,
            path.resolve(__dirname, "coresdk"),
            path.resolve(__dirname, "scripts"),
          ],
        },
      ],
    },
    output: {
      filename: "bi-embedded.js",
      library: "embeddedsdk",
      libraryTarget: "umd",
      path: path.resolve(__dirname, "dist"),
      publicPath: "",
      assetModuleFilename: "[name].[hash][ext][query]",
    },
  };

  return config;
};
