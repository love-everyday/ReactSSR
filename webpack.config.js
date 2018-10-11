const path =require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlwebpackPlugin = require('html-webpack-plugin')
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?noInfo=true&reload=true',
    './src/client.jsx',
  ],
  resolve: {
    extensions: ['.jsx', '.js']
  },
  output: {
    path: path.join(__dirname, 'assets'),
    filename: "js/[name].js",
    publicPath: '/public/',
    chunkFilename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      //*
      {
        test: /\.(jsx|js)$/, 
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader?cacheDirectory",
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
    ]
  },
  plugins: [
    new ManifestPlugin(),
    new HtmlwebpackPlugin({
      template: './src/template.html',
    }),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json',
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,//(react|react-dom|redux|react-redux|redux-thunk)[\\/]
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  }
}