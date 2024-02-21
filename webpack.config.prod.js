/* eslint-disable */

const webpack = require('webpack')
const path = require('path')

const { merge } = require('webpack-merge')
const common = require('./webpack.config.common.js')

const DIR_DOCS = path.resolve(__dirname, 'docs')
const DIR_PUBLIC = path.resolve(__dirname, 'public')

const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',

  output: {
    clean: true,
    path: DIR_DOCS,
    filename: '[name].bundle.js',
    publicPath: '/',
  },

  devtool: false,

  plugins: [
    new HtmlWebpackPlugin({
      favicon: './public/logo_48.png',
      template: './src/index_github.html',
      title: 'Alpha Account',
      publicPath: '/alpha-auth'
    }),
  ]
})