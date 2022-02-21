

module.exports = {
    publicPath:
        process.env.NODE_ENV === 
        'production'
        ?'/website-1.0/'
        :'/'
}