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
    largeServiceArea: z
      .enum([
        'SS10', // 関東
        'SS20', // 関西
        'SS30', // 東海
        'SS40', // 北海道
        'SS50', // 東北
        'SS60', // 甲信越・北陸
        'SS70', // 中国
        'SS80', // 四国
        'SS90', // 九州・沖縄
      ])
      .optional()
      .describe(
        '大サービスエリアコード: SS10(関東), SS20(関西), SS30(東海), SS40(北海道), SS50(東北), SS60(北陸・甲信越), SS70(中国), SS80(四国), SS90(九州・沖縄)'
      ),
    serviceArea: z
      .enum([
        'SA11', // 東京
        'SA12', // 神奈川
        'SA13', // 埼玉
        'SA14', // 千葉
        'SA15', // 茨城
        'SA16', // 栃木
        'SA17', // 群馬
        'SA21', // 滋賀
        'SA22', // 京都
        'SA23', // 大阪
        'SA24', // 兵庫
        'SA25', // 奈良
        'SA26', // 和歌山
        'SA31', // 岐阜
        'SA32', // 静岡
        'SA33', // 愛知
        'SA34', // 三重
        'SA41', // 北海道
        'SA51', // 青森
        'SA52', // 岩手
        'SA53', // 宮城
        'SA54', // 秋田
        'SA55', // 山形
        'SA56', // 福島
        'SA61', // 新潟
        'SA62', // 富山
        'SA63', // 石川
        'SA64', // 福井
        'SA65', // 山梨
        'SA66', // 長野
        'SA71', // 鳥取
        'SA72', // 島根
        'SA73', // 岡山
        'SA74', // 広島
        'SA75', // 山口
        'SA81', // 徳島
        'SA82', // 香川
        'SA83', // 愛媛
        'SA84', // 高知
        'SA91', // 福岡
        'SA92', // 佐賀
        'SA93', // 長崎
        'SA94', // 熊本
        'SA95', // 大分
        'SA96', // 宮崎
        'SA97', // 鹿児島
        'SA98', // 沖縄
      ])
      .optional()
      .describe(
        'サービスエリアコード（都道府県）: SA11(東京), SA12(神奈川), SA13(埼玉), SA14(千葉), SA15(茨城), SA16(栃木), SA17(群馬), SA21(滋賀), SA22(京都), SA23(大阪), SA24(兵庫), SA25(奈良), SA26(和歌山), SA31(岐阜), SA32(静岡), SA33(愛知), SA34(三重), SA41(北海道), SA51(青森), SA52(岩手), SA53(宮城), SA54(秋田), SA55(山形), SA56(福島), SA61(新潟), SA62(富山), SA63(石川), SA64(福井), SA65(山梨), SA66(長野), SA71(鳥取), SA72(島根), SA73(岡山), SA74(広島), SA75(山口), SA81(徳島), SA82(香川), SA83(愛媛), SA84(高知), SA91(福岡), SA92(佐賀), SA93(長崎), SA94(熊本), SA95(大分), SA96(宮崎), SA97(鹿児島), SA98(沖縄)'
      ),
  }),
  outputSchema: z.array(GourmetSearchShopSchema),
  execute: async ({ context }) => {
    const { keyword, order, largeServiceArea } = context;

    console.info('✅パラメーター\n', context);

    const result = await searchGourmet({
      keyword,
      order,
      largeServiceArea,
    });

    if (result.isErr()) {
      throw result.error;
    }

    console.info('✅検索結果\n', result.value);

    return result.value;
  },
});
