module.exports = {
    /*eslint-disable-next-line quotes*/
    publicPath: process.env.NODE_ENV === 'production'?'/website-1.0/':'/',

    "transpileDependencies": [
        "vuetify"
        ],

    devServer: {
        https:true
    }
    
}