import axios from 'axios';
import { err, ok, ResultAsync } from 'neverthrow';
import { env } from '@/libs/env';
import {
  GourmetSearchResponseSchema,
  type LargeServiceAreaCode,
  type Order,
  type ServiceAreaCode,
  type GourmetSearchShop,
} from './types';

const GOURMET_SEARCH_API =
  'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/';

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
  order?: Order;
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
