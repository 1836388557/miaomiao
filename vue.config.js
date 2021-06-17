module.exports = {
  devServer: {

    proxy: {
      '/apollo': {
        target: 'https://i.maoyan.com',
        changeOrigin: true
      },
      '/maoyansh': {
        target: 'https://show.maoyan.com',
        changeOrigin: true
      },
      '/ajax': {
        target: 'https://m.maoyan.com',
        changeOrigin: true
      }

    }
  }
}
