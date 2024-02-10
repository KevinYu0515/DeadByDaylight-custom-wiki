/* eslint-disable quotes */
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'?'/website-1.0/':'/',
    productionSourceMap: false,
    // publicPath: './',
    outputDir: 'dist',
    assetsDir: 'assets',
    devServer: {
        port: 8090,
        host: '0.0.0.0',
        https: true,
        open: true
    },
};