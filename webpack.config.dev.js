const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin")
// Determine host and port from Feathers configuration
const config = require('./config');
const proxy = 'http://' + (config.host || 'localhost') + ':' + (config.port || '3030') + '/';

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            css:'vue-style-loader!css-loader!'
          }
        }
      }
    ]
  },
  plugins: [
    // Browsersync webpack plugin
    new BrowserSyncPlugin({
      host: config.host || 'localhost',
      port: 3000,
      proxy: proxy,
      notify: false
    })
  ],
  devtool: '#eval-source-map'
};
