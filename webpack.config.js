const path = require('path');

module.exports = {
    entry: './client/main.js',
    output: {
        filename: '/dist/build.js'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include:[ 
                path.join(__dirname, 'client/test')
            ],
            exclude: /node_modules/
        }]
    }
}