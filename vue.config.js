module.exports = {
  publicPath: '/agency2u-test/',   // <--- tambah ini
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify')
      }
    }
  }
}
