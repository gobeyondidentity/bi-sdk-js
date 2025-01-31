const path = require("path");
const webpack = require("webpack");
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
        // Disable sourcemaps included kmc-js/snippets. 
        // These can be quite large, and aren't particularly 
        // useful.
        {
          test: /\.js$/,
          enforce: "pre",
          use: [
            {
              loader: "source-map-loader",
              options: {
                filterSourceMappingUrl: (url, resourcePath) => {
                  return false;
                },
              },
            },
          ],  
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
