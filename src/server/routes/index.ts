import { Hono } from 'hono';
import { authRoutes } from './auth';
import { healthRoute } from './health';

export const apiRoutes = new Hono()
  .route('/auth', authRoutes)
  .route('/health', healthRoute);

export type ApiRoutes = typeof apiRoutes;
