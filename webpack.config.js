module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

    devServer: {
        inline: true,
        port: 7777,
        contentBase: __dirname + '/public'
    },

    module:
    {
        loaders: [
            {
              test: /\.js$/,
              loader: ['react-hot-loader','babel-loader?' + JSON.stringify({
                cacheDirectory: true,
                presets: ['es2015', 'stage-0', 'react'],
              })],
              exclude: /node_modules/

            }
        ]
    }
};
