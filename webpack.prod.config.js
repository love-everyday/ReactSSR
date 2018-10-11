const path =require('path')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlwebpackPlugin = require('html-webpack-plugin')
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: [
    './src/client.jsx',
  ],
  resolve: {
    extensions: ['.jsx', '.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "js/[name].[chunkhash:6].js",
    publicPath: '/dist/',
    chunkFilename: 'js/[name].bundle.[chunkhash:6].js',
  },
  module: {
    rules: [
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash:6].css',
      chunkFilename: 'css/[name].[chunkhash:6].css',
    }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',// 目标文件名
      algorithm: 'gzip',// 使用gzip压缩
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,// 资源文件大于10240B=10kB时会被压缩
      minRatio: 0.8 // 最小压缩比达到0.8时才会被压缩
    }),
    new webpack.HashedModuleIdsPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    })
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      }
    })],
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