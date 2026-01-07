import { err, ok, ResultAsync } from 'neverthrow';
import { GourmetSearchResponseSchema, type GourmetSearchShop } from './types';
import axios from 'axios';
import { env } from '@/libs/env';

const GOURMET_SEARCH_API = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"

/**
 * HOT PEPPERグルメAPIを使用して、指定したキーワードで飲食店を検索
 */
export const searchGourmet = ({keyword}: {keyword: string}): ResultAsync<GourmetSearchShop[], Error> => {
  return ResultAsync.fromPromise(
    axios.get(GOURMET_SEARCH_API, {params: {key: env.HOTPEPPER_GOURMET_API_KEY, format: "json", keyword}}),
    (error) => error instanceof Error ? error : new Error(String(error))
  ).andThen((response) => {
    const parsed = GourmetSearchResponseSchema.safeParse(response.data)

    return parsed.success ? ok(parsed.data.results.shop) : err(parsed.error)
  })
};
