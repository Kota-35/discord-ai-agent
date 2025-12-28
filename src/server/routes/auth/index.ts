import { Hono } from 'hono';
import { googleAuthRoutes } from './google';

export const authRoutes = new Hono().route('/google', googleAuthRoutes);
