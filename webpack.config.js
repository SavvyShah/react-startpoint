const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        port: 8082,
        contentBase: './client/public',
    },
    entry: path.join(__dirname, 'client', 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'client', 'public'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: path.join(__dirname, 'client', 'public', 'index.html'),
            template: path.join(__dirname, 'client', 'src', 'index.html'),
            chunksSortMode: 'none',
            favicon: path.join(
                __dirname,
                'client',
                'src',
                'assets',
                'favicon.ico'
            ),
        }),
    ],
    module: {
        // If you want to load some other stuff https://webpack.js.org/guides/asset-management
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader'],
            },
        ],
    },
}
