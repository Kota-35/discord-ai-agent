import { Hono } from 'hono';

export const healthRoute = new Hono().get('/', async (c) => {
  console.info(c.body);

  return c.json({ ok: true });
});
