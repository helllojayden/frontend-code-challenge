'use strict';

process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

process.on('unhandledRejection', (err) => {
  throw err;
});

const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config/webpack.config');

function build() {
  webpack(config, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.log(chalk.red(`${err.details}\n`));
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.log(chalk.red(`${info.errors}\n`));
    }

    if (stats.hasWarnings()) {
      console.log(chalk.yellow(`${info.warnings}\n`));
    }
  });
}

build();
