import 'babel-polyfill';
import Koa from 'koa';
import koaLogger from 'koa-logger';
import serve from 'koa-static';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import session from 'koa-generic-session';
import methodOverride from 'koa-methodoverride';

import path from 'path';
import addRoutes from './routes';
import container from './container';

export default () => {
  const app = new Koa();

  // LOGGER
  app.use(koaLogger());

  // SESSION
  app.use(session(app));

  // FLASH
  app.keys = ['some secret hurr'];

  // BODYPARSER
  app.use(bodyParser({
    strict: false,
  }));

  // OVERRIDE
  app.use(methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      return req.body._method; // eslint-disable-line
    }
    return null;
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
