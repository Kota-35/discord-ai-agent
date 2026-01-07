import { ResultAsync } from 'neverthrow';
import { initializeDiscordBot } from '@/features/discord';

const main = (): ResultAsync<string, Error> => {
  return initializeDiscordBot();
};

main()
  .map(() => {
    console.info('✅ Botが正常にログインしました');
  })
  .mapErr((error) => {
    console.error(`❌ 起動に失敗しました: ${error.message}`);
    process.exit(1);
  });
