import { Hono } from 'hono';

export const googleAuthRoutes = new Hono()
  .get('/', async (c) => {
    // Googleの検証開始
  })
  .get('/callback', async (c) => {
    // callback処理
  });
