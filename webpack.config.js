const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 8082,
    contentBase: './client/public'
  },
  entry: path.join(__dirname, 'client', 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'client', 'public'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${__dirname}/client/public/index.html`,
      template: `${__dirname}/client/src/index.html`,
      chunksSortMode: 'none'
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
