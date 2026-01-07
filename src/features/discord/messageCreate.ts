import { gourmetSearchAgent } from '@/features/mastra/agents/gourmetSearchAgent';
import { discordClient } from '@/libs/discord';

discordClient.on('messageCreate', async (message) => {
  console.info('✅ messageCreate');

  // メッセージの送信者がbotなら無視
  if (message.author.bot) {
    return;
  }

  const response = await gourmetSearchAgent.generate(message.content);

  console.info('✅botメッセージ\n', response.text);

  await message.channel.send(response.text);
});
