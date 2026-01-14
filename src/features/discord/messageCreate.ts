import { gourmetSearchAgent } from '@/features/mastra/agents/gourmetSearchAgent';
import { discordClient } from '@/libs/discord';

discordClient.on('messageCreate', async (message) => {
  // メッセージの送信者がbotなら無視
  if (message.author.bot) {
    return;
  }

  // botがメンションされていない場合には無視
  if (!message.mentions.has(discordClient.user!)) {
    return;
  }

  console.info('✅ messageCreate');
  console.info(`${message.author.displayName}`)
  console.info(`${message.content}`)

  const response = await gourmetSearchAgent.generate(message.content);

  console.info('✅botメッセージ\n', response.text);

  await message.channel.send(response.text);
});
