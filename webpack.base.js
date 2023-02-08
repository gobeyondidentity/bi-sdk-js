// We're passing in the webpack module to allow building of coresdk without installing dependencies on this level
exports.config = (env, webpack) => {
  return {
    target: "web",

    // Always build in production mode, but disable 
    // minification. The application that bundles this 
    // package will provide the minification. 
    mode: "production",
    optimization: {
      minimize: false,
    },

    // Do not produce source maps.
    // We have the non-minified transformed source available 
    // for non-prod builds, so we can still debug. But it's 
    // not ideal.
    // But... producing a sourcemap of kmc-ffi more than doubles 
    // the size of the bundle - the inline wasm is included in the 
    // sourcemap text - to about 70MB (the debug wasm binary is ~30MB).
    // Worse, producing an inline source map for coresdk and then 
    // again for embeddedsdk more than quadruples the ebmeddedsdk 
    // bundle to about 168MB. Webpack is recursively including 
    // sourcemap dataurls into the sourcemap text. 
    devtool: false,

    entry: "./src/index.ts",
    plugins: [
      new webpack.DefinePlugin({
        CHANNEL: JSON.stringify(env.CHANNEL),
        DEVICE_GATEWAY_URL: JSON.stringify(env.DEVICE_GATEWAY_URL),
      }),
    ],

    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
  };
};
