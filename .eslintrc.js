module.exports = {
  root: true,
  extends: ['expo', 'prettier', 'eslint:recommended'],
  plugins: ['prettier'],
  ignorePatterns: ['.expo', 'android', 'ios', 'build', 'node_modules'],
  rules: {
    'prettier/prettier': 'warn',
  },
}
