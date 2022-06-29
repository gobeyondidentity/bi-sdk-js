const path = require("path");
const webpack = require("webpack")
const base = require("../webpack.base");

module.exports = (env) => {
  const baseConfig = base.config(env, webpack);
  const config = {
    ...baseConfig,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    output: {
      filename: "bi-core.js",
      library: "coresdk",
      libraryTarget: "umd",
      path: path.resolve(__dirname, "dist"),
      publicPath: "",
      assetModuleFilename: "[name].[hash][ext][query]",
      clean: true,
    },
  };

  return config;
};
