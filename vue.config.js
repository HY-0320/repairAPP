module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://i-review.xyz",
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: {
          "^/api": "https://i-review.xyz/api"
        }
      }
    }
  }
};
