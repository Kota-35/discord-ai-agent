import { Tool } from '@mastra/core/tools';
import z from 'zod';
import { searchGourmet } from '@/libs/hotpepperGourmet';
import { GourmetSearchShopSchema } from '@/libs/hotpepperGourmet/gourmetSearch/types';

export const gourmetSearchTool = new Tool({
  id: 'search-gourmet',
  description: 'Hot PepperグルメAPIから商品名などをもとにお店を10件検索する',
  inputSchema: z.object({
    keyword: z
      .string()
      .describe(
        'グルメの名前 ex: ラーメン、豚骨ラーメン、プリンなど 他にも、店名かな、店名、住所、駅名、お店ジャンルキャッチ、キャッチのフリーワード検索(部分一致)が可能です。文字コードはUTF8。半角スペース区切りの文字列を渡すことでAND検索になる。複数指定可能'
      ),
    order: z
      .enum([
        '店名かな順',
        'ジャンルコード順',
        '小エリアコード順',
        'おススメ順',
      ])
      .optional()
      .describe(
        'ソート順 検索結果の並び順を指定します。おススメ順は定期的に更新されます。※ 位置検索の場合、「4:オススメ順」以外は指定に関係なく、強制的に距離順でソートされます。初期値(undefinedの場合)はおススメ順。位置から検索を行った場合は距離順'
      ),
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
