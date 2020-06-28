'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', (err) => {
  throw err;
});

const chalk = require('chalk');
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../config/webpack.config');
const createDevServerConfig = require('../config/webpackDevServer.config');

const devServerOptions = Object.assign({}, createDevServerConfig(), {
  open: true,
  stats: {
    colors: true,
  },
});

let compiler;
try {
  compiler = Webpack(webpackConfig);
} catch (err) {
  console.log(chalk.red('Failed to compile.'));
  console.log();
  console.log(err.message || err);
  console.log();
  process.exit(1);
}

const server = new WebpackDevServer(compiler, devServerOptions);
const PORT = process.env.PORT || 8080;

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Starting server on http://localhost:${PORT}`);
});
