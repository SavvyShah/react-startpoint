const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const manifest = require('./manifest.js')

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin()],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      // minimum chunk size 30KB
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor'
        }
      }
    }
  },
  entry: path.join(__dirname, 'client', 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'client', 'public'),
    filename: '[name].[contentHash].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${__dirname}/client/public/index.html`,
      template: `${__dirname}/client/src/index.html`,
      chunksSortMode: 'none'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!images/*/*', //Matches till 1 level folder inside images folder
        '!images/*', //Matches all files inside image folder
        '!favicon.ico',
        '!404.html'
      ]
    }),
    new ManifestPlugin({
      seed: manifest,
      fileName: 'manifest.webmanifest'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
