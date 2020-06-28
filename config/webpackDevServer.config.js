'use strict';

module.exports = function () {
  return {
    contentBase: '../dist',
    hot: true,
    overlay: {
      errors: true,
    },
  };
};
