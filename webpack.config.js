const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')



const WorkboxWebpackPlugin = require('workbox-webpack-plugin');




module.exports = {
  mode: 'development',
  
  devtool: "eval-cheap-module-source-map",

  plugins: [
    new webpack.ProgressPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: false,
          }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
  __VUE_OPTIONS_API__: true,
  __VUE_PROD_DEVTOOLS__: false
})
  ],

  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
      test: /\.(js|jsx)$/,
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader'
    }, {
      test: /.css$/,

      use: [{
        loader: "vue-style-loader"
      },
      {
        loader: "css-loader",

        options: {
          sourceMap: true
        }
      }]
    }]
  },

  devServer: {
    open: true,
    port: 8080,
    host: 'localhost'
  }
}
