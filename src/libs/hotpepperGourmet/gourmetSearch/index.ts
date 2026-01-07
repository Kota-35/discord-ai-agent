import axios from 'axios';
import { err, ok, ResultAsync } from 'neverthrow';
import { env } from '@/libs/env';
import { GourmetSearchResponseSchema, type GourmetSearchShop } from './types';

const GOURMET_SEARCH_API =
  'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/';

type LargeServiceAreaCode =
  | 'SS10' // 関東
  | 'SS20' // 関西
  | 'SS30' // 東海
  | 'SS40' // 北海道
  | 'SS50' // 東北
  | 'SS60' // 北陸・甲信越
  | 'SS70' // 中国
  | 'SS80' // 四国
  | 'SS90'; // 九州・沖縄

type ServiceAreaCode =
  | 'SA11' // 東京
  | 'SA12' // 神奈川
  | 'SA13' // 埼玉
  | 'SA14' // 千葉
  | 'SA15' // 茨城
  | 'SA16' // 栃木
  | 'SA17' // 群馬
  | 'SA21' // 滋賀
  | 'SA22' // 京都
  | 'SA23' // 大阪
  | 'SA24' // 兵庫
  | 'SA25' // 奈良
  | 'SA26' // 和歌山
  | 'SA31' // 岐阜
  | 'SA32' // 静岡
  | 'SA33' // 愛知
  | 'SA34' // 三重
  | 'SA41' // 北海道
  | 'SA51' // 青森
  | 'SA52' // 岩手
  | 'SA53' // 宮城
  | 'SA54' // 秋田
  | 'SA55' // 山形
  | 'SA56' // 福島
  | 'SA61' // 新潟
  | 'SA62' // 富山
  | 'SA63' // 石川
  | 'SA64' // 福井
  | 'SA65' // 山梨
  | 'SA66' // 長野
  | 'SA71' // 鳥取
  | 'SA72' // 島根
  | 'SA73' // 岡山
  | 'SA74' // 広島
  | 'SA75' // 山口
  | 'SA81' // 徳島
  | 'SA82' // 香川
  | 'SA83' // 愛媛
  | 'SA84' // 高知
  | 'SA91' // 福岡
  | 'SA92' // 佐賀
  | 'SA93' // 長崎
  | 'SA94' // 熊本
  | 'SA95' // 大分
  | 'SA96' // 宮崎
  | 'SA97' // 鹿児島
  | 'SA98'; // 沖縄

/**
 * HOT PEPPERグルメAPIを使用して、指定したキーワードで飲食店を検索
 */
export const searchGourmet = ({
  keyword,
  order,
  largeServiceArea,
  serviceArea,
}: {
  keyword: string;
  order?: '店名かな順' | 'ジャンルコード順' | '小エリアコード順' | 'おススメ順';
  largeServiceArea?: LargeServiceAreaCode;
  serviceArea?: ServiceAreaCode;
}): ResultAsync<GourmetSearchShop[], Error> => {
  return ResultAsync.fromPromise(
    axios.get(GOURMET_SEARCH_API, {
      params: {
        key: env.HOTPEPPER_GOURMET_API_KEY,
        format: 'json',
        keyword,
        order,
        large_service_area: largeServiceArea,
        service_area: serviceArea,
      },
    }),
    (error) => (error instanceof Error ? error : new Error(String(error)))
  ).andThen((response) => {
    const parsed = GourmetSearchResponseSchema.safeParse(response.data);

    return parsed.success ? ok(parsed.data.results.shop) : err(parsed.error);
  });
};
