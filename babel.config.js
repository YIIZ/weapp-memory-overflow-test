module.exports = {
  babelrc: false,
  presets: [
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: 'usage',
      corejs: { version: 3, proposals: true },
      debug: true,
    }],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
  ],
}
