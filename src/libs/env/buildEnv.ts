import { EnvSchema } from './envSchema.ts';

const parsedEnv = EnvSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    new Error(
      `❌ 無効な環境変数です: ${JSON.stringify(parsedEnv.error.issues, null, 2)}`
    )
  );
  process.exit(1);
}

export const env = parsedEnv.data;
