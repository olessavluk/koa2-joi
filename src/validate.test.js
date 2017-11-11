'use strict';

const request = require('supertest');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const joi = require('joi');
const util = require('util');
const validate = require('./validate');

let app;

beforeEach(() => {
  app = new Koa();

  app
    .use(bodyParser())
    .use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        if (err.isJoi) {
          ctx.body = err.details;
          // ctx.app.emit('error', err, ctx);
        } else {
          throw err;
        }
      }
    })
    .use(
      validate({
        body: {
          test: joi.number().required(),
        },
      }),
    )
    .use(ctx => {
      ctx.body = ctx.request.body;
    });
});

it('should reject an invalid request', async () => {
  expect.assertions(1);
  const r = await request(app.listen())
    .post('/')
    .send({ fail: 'fail' });

  expect(r.body).toMatchSnapshot();
});

it('should accept a valid request', async () => {
  expect.assertions(1);
  const r = await request(app.listen())
    .post('/')
    .send({ test: 1 });
  expect(r.body).toMatchSnapshot();
});
