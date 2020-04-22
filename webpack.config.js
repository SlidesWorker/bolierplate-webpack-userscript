const path = require('path');
const fs = require('fs');
const WebpackUserscript = require('webpack-userscript');

// const dev = process.env.NODE_ENV === 'development';
// const devl_local = process.env.LOCAL_DEV === '1';
const dev = true;
const dev_local = true;


// default
let webpack_vars;
const webpack_vars_defaults = {
  outputFilename: 'bolierplate-webpack-userscript.user.js',
  userscript: {
    name: 'bolierplate-webpack-userscript',
    match: '*',
  }
};

if (fs.existsSync(path.resolve(__dirname, 'webpack.vars.js'))) {
  webpack_vars = Object.assign(webpack_vars_defaults, require('./webpack.vars'));
} else {
  webpack_vars = webpack_vars_defaults;
}


const userscriptHeaders= webpack_vars.userscript;
userscriptHeaders.version= dev ? `[version]-build.[buildNo]` : `[version]`;


module.exports = {
  mode: dev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: webpack_vars.outputFilename
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000
  },
  plugins: [
    new WebpackUserscript({
      headers: userscriptHeaders,
      proxyScript: {
        baseUrl: 'http://127.0.0.1:9000',
        filename: '[basename].proxy.user.js',
        enable: dev
      }
    })
  ]
}
