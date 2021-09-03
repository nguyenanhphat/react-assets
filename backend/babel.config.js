module.exports = {
  ignore: [/node_modules/],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-optional-chaining'],
    ['@babel/plugin-proposal-throw-expressions'],
    ['@babel/plugin-proposal-export-namespace-from'],
    ['@babel/plugin-proposal-export-default-from'],
    ['@babel/plugin-transform-modules-commonjs'],
    ['@babel/plugin-syntax-dynamic-import'],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 12,
        },
      },
    ],
  ],
};
