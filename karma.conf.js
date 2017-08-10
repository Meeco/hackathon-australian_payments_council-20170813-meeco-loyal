var webpack = require('webpack');
var path = require('path');

function root(localPath) {
  return path.resolve(__dirname, localPath);
}

module.exports = function(config) {
  var _config = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [{pattern: './karma.shim.js', watched: true}],

    preprocessors: {'./karma.shim.js': ['webpack', 'sourcemap']},

    webpack: {
      devtool: 'inline-source-map',

      resolve: {extensions: ['.ts', '.js']},

      module: {
        rules: [
          {test: /\.ts$/, loaders: [{loader: 'ts-loader'}, 'angular2-template-loader']},
          {test: /\.html$/, loader: 'html-loader?attrs=false'},
          {test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'null-loader'}
        ]
      },

      plugins: [new webpack.ContextReplacementPlugin(
          // The (\\|\/) piece accounts for path separators in *nix and Windows
          /(ionic-angular)|(angular(\\|\/)core(\\|\/)@angular)/,
          root('./src'),  // location of your src
          {}              // a map of your routes
          )]
    },
    webpackMiddleware: {stats: 'errors-only'},

    webpackServer: {noInfo: true},

    browserConsoleLogOptions: {level: 'log', format: '%b %T: %m', terminal: true},

    reporters: ['kjhtml', 'dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome_without_sandbox'],
    customLaunchers: {
      Chrome_without_sandbox: {
        base: 'Chrome',
        flags: ['--no-sandbox'],  // with sandbox it fails under Docker
        displayName: 'Chrome w/o sandbox'
      }
    },
    singleRun: false
  };

  config.set(_config);
};
