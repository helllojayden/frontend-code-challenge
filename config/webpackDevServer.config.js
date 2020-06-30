'use strict';

module.exports = function () {
  return {
    contentBase: '../dist',
    watchContentBase: true,
    hot: true,
    overlay: {
      errors: true,
    },
  };
};
