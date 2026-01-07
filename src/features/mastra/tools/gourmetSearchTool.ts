import { Tool } from '@mastra/core/tools';
import z from 'zod';
import { searchGourmet } from '@/libs/hotpepperGourmet';
import { GourmetSearchShopSchema } from '@/libs/hotpepperGourmet/gourmetSearch/types';

export const gourmetSearchTool = new Tool({
  id: 'search-gourmet',
  description: 'Hot PepperグルメAPIから商品名などをもとにお店を検索する',
  inputSchema: z.object({
    keyword: z
      .string()
      .describe('グルメの名前 ex: ラーメン、豚骨ラーメン、プリンなど'),
  }),
  outputSchema: z.array(GourmetSearchShopSchema),
  execute: async ({ context }) => {
    const { keyword } = context;

    const result = await searchGourmet({ keyword });

    if (result.isErr()) {
      throw result.error;
    }

    return result.value;
  },
});
