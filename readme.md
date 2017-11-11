## koa2-joi

[![NPM version][npm-image]][npm-url]
[![CircleCI](https://circleci.com/gh/olessavluk/koa2-joi.svg?style=svg)](https://circleci.com/gh/olessavluk/koa2-joi)

[Koa](koajs.com) middlevare for request validation using [Joi](https://github.com/hapijs/joi). Have similar to [koa-joi](https://github.com/pierreinglebert/koa-joi)  interface, but with support for koa2 with async/await

## Installation

```
npm install --save koa2-joi
```

## Usage
```javascript
const validate = require('koa2-joi');

const schema = {
  headers: joi.object().keys({
    'my-custom-header': joi.string().required(),
  }),
  body: joi.object().keys({
    email: joi
      .string()
      .email()
      .required(),
    password: joi
      .string()
      .required(),
  }),
};

route.post('/login', validate(schema), async ctx => {...})
```

[npm-image]: https://img.shields.io/npm/v/koa2-joi.svg
[npm-url]: https://www.npmjs.com/package/koa2-joi

