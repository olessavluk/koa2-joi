'use strict';

const joi = require('joi');

module.exports = (schemas, options) => async (ctx, next) => {
  Object.keys(schemas).forEach(key => {
    const { error } = joi.validate(ctx.request[key], schemas[key], options);
    if (error) throw error;
  });
  return next();
};
