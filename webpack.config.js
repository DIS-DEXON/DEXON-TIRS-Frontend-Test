var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.vue']
    },
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
    }
}