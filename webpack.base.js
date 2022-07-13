// We're passing in the webpack module to allow building of coresdk without installing dependencies on this level
exports.config = (env, webpack) => {

  return {
    target: "web",
    mode: env.CHANNEL === "production" ? "production" : "development",
    entry: "./src/index.ts",
    experiments: {
      asyncWebAssembly: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        CHANNEL: JSON.stringify(env.CHANNEL),
        DEVICE_GATEWAY_URL: JSON.stringify(env.DEVICE_GATEWAY_URL),
        OPTIMIZELY_SDK_KEY: JSON.stringify(env.OPTIMIZELY_SDK_KEY),
      }),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
  };
};
