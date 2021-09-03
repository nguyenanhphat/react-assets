const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function getPlugins() {
  return [
    process.env.NODE_ENV === 'local' ? new NodemonPlugin() : null,
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src', 'locales'), to: 'locales' },
        { from: path.resolve(__dirname, 'src', 'config'), to: 'config' },
        { from: path.resolve(__dirname, 'migrations'), to: 'migrations' },
        { from: `.env.${process.env.NODE_ENV}`, to: '.env', toType: 'file' },
        { from: 'package.json', to: 'package.json' },
        { from: '.sequelizerc', to: '.sequelizerc', toType: 'file' },
      ],
    }),
  ].filter(plugin => plugin);
}

module.exports = {
  mode: process.env.NODE_ENV !== 'local' ? 'production' : 'development',
  entry: './src/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, `dist/${process.env.NODE_ENV}`),
    filename: 'app.js',
  },
  node: {
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
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
          },
        },
      },
      {
        test: /\.jade$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'pug-html-loader',
        },
      },
    ],
  },
  plugins: getPlugins(),
};
