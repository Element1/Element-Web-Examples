const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

  mode: 'development',
  devtool: 'eval-source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: false,
    host: 'localhost',
    port: 9453,
    hot: true,
  },

  entry: {
    'main': './src/main.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true,
  },
  
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/web-ekyc/',
          to: './sdk/',
        },
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/main.html',
      chunks: ['main'],
      filename: 'index.html',
    }),
  ],

}