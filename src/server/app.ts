import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { apiRoutes } from './routes';

export const createApp = () => {
  const app = new Hono();

  app.use('*', logger());

  app.route('/api', apiRoutes);
  app.get('/', async (c) => {
    return c.text('Hello Hono!');
  });
  return app;
};
