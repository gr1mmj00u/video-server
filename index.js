import 'babel-polyfill';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import serve from 'koa-static';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import path from 'path';
import addRoutes from './routes';
import container from './container';

export default () => {
  const app = new Koa();

  // ERROR
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.body = { error: true, message: err.message };
    }
  });

  // LOGGER
  app.use(koaLogger());

  // BODYPARSER
  app.use(bodyParser({
    strict: false,
  }));
  // STATIC
  app.use(serve(path.join(__dirname, 'public')));

  // ROUTING
  const router = new Router();
  addRoutes(router, container);
  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
};
