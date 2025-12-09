module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
        polyfills: ['es6.promise', 'es6.symbol']
      }
    ]
  ]
}
