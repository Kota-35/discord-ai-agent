import z from 'zod';

/**
 * 環境変数のスキーマ
 * @see https://zenn.dev/kiwichan101kg/articles/7ba33ab64414b2
 */
export const EnvSchema = z.object({
  DISCORD_BOT_TOKEN: z.string().describe('discord botのトークン'),

  PORT: z.number().optional().default(3000).describe('サーバーのポート番号'),
});

export type Env = z.infer<typeof EnvSchema>;
