import { serve } from '@hono/node-server';
import { ResultAsync } from 'neverthrow';
import { env } from '@/libs/env';
import { createApp } from './app';

export const startServer = (): ResultAsync<void, Error> => {
  const app = createApp();

  return ResultAsync.fromPromise(
    new Promise<void>((resolve) => {
      serve(
        {
          fetch: app.fetch,
          port: env.PORT,
        },
        (info) => {
          console.info(
            `✅ サーバーが起動しました: http://localhost:${info.port}`
          );
          resolve();
        }
      );
    }),
    (error) => (error instanceof Error ? error : new Error(String(error)))
  );
};
