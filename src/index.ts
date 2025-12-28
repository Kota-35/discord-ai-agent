import '@/handlers/clientReady';
import { ResultAsync } from 'neverthrow';
import { discordClient } from '@/libs/discord';
import { env } from '@/libs/env';
import { startServer } from '@/server';

const setupErrorHandlers = (): void => {
  discordClient.on('error', (error) => {
    console.error('❌ Discordクライアントでエラーが発生しました: ', error);
  });

  process.on('unhandledRejection', (error) => {
    console.error('未処理のPromise拒否', error);
  });

  process.on('SIGINT', async () => {
    console.info('Botをシャットダウンしています...');
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

const main = (): ResultAsync<[string, void], Error> => {
  setupErrorHandlers();

  const botLogin = loginBot(env.DISCORD_BOT_TOKEN);
  const server = startServer();

  return ResultAsync.combine([botLogin, server]);
};

main()
  .map(([token, _]) => {
    console.info('✅ Botが正常にログインしました');
    console.info('✅ すべてのサービスが起動しました');
    return token;
  })
  .mapErr((error) => {
    console.error(`❌ 起動に失敗しました: ${error.message}`);
    process.exit(1);
  });
