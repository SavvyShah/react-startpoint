const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

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
                    name: 'vendor',
                },
            },
        },
    },
    entry: path.join(__dirname, 'client', 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'client', 'public'),
        filename: '[name].[contentHash].bundle.js',
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*', // Checkout glob pattern docs and https://globster.xyz
                '!favicon.ico',
                '!404.html',
            ],
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
