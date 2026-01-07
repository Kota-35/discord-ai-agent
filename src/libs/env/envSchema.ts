import z from 'zod';

/**
 * 環境変数のスキーマ
 * @see https://zenn.dev/kiwichan101kg/articles/7ba33ab64414b2
 */
export const EnvSchema = z.object({
  DISCORD_BOT_TOKEN: z.string().describe('discord botのトークン'),

  OPENAI_API_KEY: z.string().describe('OPENAIのAPIキー'),

  HOTPEPPER_GOURMET_API_KEY: z.string().describe("HOT PEPPERグルメのAPIキー")
});

export type Env = z.infer<typeof EnvSchema>;
