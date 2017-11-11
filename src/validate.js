'use strict';

module.exports = (schema, options) => async (ctx, next) => {
  Object.keys(schema).forEach(key => {
    const { error } = schema[key].validate(ctx.request[key], options);
    if (error) throw error;
  });
  return next();
};
