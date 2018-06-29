'use strict';

const _ = require('lodash');

/**
 * Method to find .css test from webpack `config.module.rules`
 * @param {array} rules
 */
const findCssTest = rules => {
  for (let index = 0; index < rules.length; index++) {
    const rule = rules[index];
    if (!_.isPlainObject(rule)) {
      return;
    }

    if (Array.isArray(rule.test) && rule.test.some(ext => ext.test('.css')) || _.isRegExp(rule.test) && rule.test.test('.css')) {
      return {
        rules,
        index
      };
    } else if (rule.oneOf) {
      return findCssTest(rule.oneOf);
    }
  }
};

module.exports = {
  findCssTest
};
