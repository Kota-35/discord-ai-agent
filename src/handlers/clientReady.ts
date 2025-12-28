import { discordClient } from '@/libs/discord';

discordClient.once('clientReady', () => {
  console.info('Ready!');
  if (discordClient.user) {
    console.info(`Logged in as ${discordClient.user.tag}`);
  }
});
