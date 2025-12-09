module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  extends: ['plugin:vue/essential', 'plugin:prettier/recommended', '@vue/prettier'],
  plugins: ['vuetify', 'prettier'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/valid-v-slot': [
      'error',
      {
        allowModifiers: true
      }
    ]
  }
}
