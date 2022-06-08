module.exports = {
  // Put your normal webpack config below here
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: { "react-dom": "@hot-loader/react-dom" },
    fallback: {
      "fs": require.resolve("fs"),
      "tls": false,
      "net": false,
      "http": require.resolve("stream-http"),
      "https": require.resolve("stream-http"),
      "zlib": false,
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/"),
      "crypto": false,
      "url": require.resolve("url/"),
      "assert":require.resolve("assert/"),
      "timers":false,
      "os": require.resolve("os-browserify/browser")
    }
  },
  module: {
    rules: require("./webpack.rules"),
  },
  target: 'node',
};
