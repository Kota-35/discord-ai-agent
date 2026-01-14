import './clientReady';
import './messageCreate';
import { ResultAsync } from 'neverthrow';
import { discordClient } from '@/libs/discord';
import { env } from '@/libs/env';

const setupErrorHandlers = (): void => {
  discordClient.on('error', (error) => {
    console.error('❌ Discordクライアントでエラーが発生しました: ', error);
  });

  process.on('unhandledRejection', (error) => {
    console.error('未処理のPromise拒否', error);
  });

  process.on('SIGINT', async () => {
    console.info('\nBotをシャットダウンしています...');
    discordClient.destroy();
    process.exit(0);
  });
};

/**
 * Botのログイン処理
 */
const loginBot = (token: string): ResultAsync<string, Error> =>
  ResultAsync.fromPromise(discordClient.login(token), (error) =>
    error instanceof Error ? error : new Error(String(error))
  ).mapErr((e) => e);

export const initializeDiscordBot = (): ResultAsync<string, Error> => {
  setupErrorHandlers();

  return loginBot(env.DISCORD_BOT_TOKEN);
};
