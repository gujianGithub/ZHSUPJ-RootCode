const path = require("path");
const uglify = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        entry: './src/js/entry.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '10.41.137.55',
        compress: true,
        port: 5222,
        historyApiFallback:true,
        /* inline:true,
        hot:true, */
       /*  proxy:{
            '/':{
                bypass:function(req,res,proxyOptions){
                    return `${PUBLICPATH}/index.html`;
                }
            }
        }, */
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader?modules&importLoaders-l&localIdentName=[name]__[local]___[hash:base64:5]'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ['react', 'es2015'],
                    plugins: [
                        ['import', {libraryName: 'antd-mobile', style: "css"}],
                    ],
                }
            },
            {
                test: /\.(gif|jpg|jpeg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000&name=[path][name].[ext]'
                //loader: 'url-loader'
            }
        ]
    },
    plugins: [
        // new uglify()
    ],
    devtool: 'source-map-support',
    
}
