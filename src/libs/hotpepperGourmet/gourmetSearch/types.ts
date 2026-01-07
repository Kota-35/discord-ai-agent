import z from 'zod';

// エリア関連のスキーマ
const AreaSchema = z.object({
  code: z.string().describe('エリアコード'),
  name: z.string().describe('エリア名'),
});

// ジャンル関連のスキーマ
const GenreSchema = z.object({
  name: z.string().describe('ジャンル名'),
  catch: z.string().describe('ジャンルキャッチ'),
  code: z.string().describe('ジャンルコード'),
});

const SubGenreSchema = z.object({
  name: z.string().describe('サブジャンル名'),
  code: z.string().describe('サブジャンルコード'),
});

// 予算関連のスキーマ
const BudgetSchema = z.object({
  code: z.string().describe('予算コード'),
  name: z.string().describe('予算名'),
  average: z.string().describe('平均予算'),
});

// URL関連のスキーマ
const UrlsSchema = z.object({
  pc: z.string().url().describe('PC向けURL'),
});

// 写真関連のスキーマ
const PhotoPCSchema = z.object({
  l: z.string().url().describe('大サイズ画像URL'),
  m: z.string().url().describe('中サイズ画像URL'),
  s: z.string().url().describe('小サイズ画像URL'),
});

const PhotoMobileSchema = z.object({
  l: z.string().url().describe('大サイズ画像URL'),
  s: z.string().url().describe('小サイズ画像URL'),
});

const PhotoSchema = z.object({
  pc: PhotoPCSchema.describe('PC向け写真'),
  mobile: PhotoMobileSchema.describe('携帯向け写真'),
});

// クーポンURL関連のスキーマ
const CouponUrlsSchema = z.object({
  pc: z.string().url().describe('PC向けクーポンURL'),
  sp: z.string().url().describe('スマートフォン向けクーポンURL'),
});

// メインの店舗スキーマ
export const GourmetSearchShopSchema = z.object({
  id: z.string().describe('お店ID'),
  name: z.string().describe('掲載店名'),
  logo_image: z.string().url().describe('ロゴ画像'),
  name_kana: z.string().describe('掲載店名かな'),
  address: z.string().describe('住所'),
  station_name: z.string().optional().describe('最寄駅名'),
  ktai_coupon: z.coerce.number().describe('携帯用クーポン掲載 0:あり、1:なし'),
  large_service_area: AreaSchema.describe('大サービスエリア'),
  service_area: AreaSchema.describe('サービスエリア'),
  large_area: AreaSchema.describe('大エリア'),
  middle_area: AreaSchema.describe('中エリア'),
  small_area: AreaSchema.describe('小エリア'),
  lat: z.coerce.number().describe('緯度'),
  lng: z.coerce.number().describe('経度'),
  genre: GenreSchema.describe('お店ジャンル'),
  sub_genre: SubGenreSchema.optional().describe('お店サブジャンル'),
  budget: BudgetSchema.optional().describe('ディナー予算'),
  catch: z.string().describe('お店キャッチ'),
  capacity: z.coerce.number().optional().describe('総席数'),
  access: z.string().describe('交通アクセス'),
  mobile_access: z.string().optional().describe('携帯用交通アクセス'),
  urls: UrlsSchema.describe('店舗URL'),
  photo: PhotoSchema.describe('写真'),
  open: z.string().optional().describe('営業時間'),
  close: z.string().optional().describe('定休日'),
  party_capacity: z.coerce.number().optional().describe('最大宴会収容人数'),
  other_memo: z.string().optional().describe('その他設備'),
  shop_detail_memo: z.string().optional().describe('備考'),
  budget_memo: z.string().optional().describe('料金備考'),
  wedding: z.string().optional().describe('ウェディング･二次会'),
  course: z.string().optional().describe('コース'),
  free_drink: z.string().optional().describe('飲み放題'),
  free_food: z.string().optional().describe('食べ放題'),
  private_room: z.string().optional().describe('個室'),
  horigotatsu: z.string().optional().describe('掘りごたつ'),
  tatami: z.string().optional().describe('座敷'),
  card: z.string().optional().describe('カード可'),
  non_smoking: z.string().optional().describe('禁煙席'),
  charter: z.string().optional().describe('貸切可'),
  parking: z.string().optional().describe('駐車場'),
  barrier_free: z.string().optional().describe('バリアフリー'),
  show: z.string().optional().describe('ライブ・ショー'),
  karaoke: z.string().optional().describe('カラオケ'),
  band: z.string().optional().describe('バンド演奏可'),
  tv: z.string().optional().describe('TV・プロジェクター'),
  lunch: z.string().optional().describe('ランチ'),
  midnight: z.string().optional().describe('23時以降も営業'),
  english: z.string().optional().describe('英語メニュー'),
  pet: z.string().optional().describe('ペット可'),
  child: z.string().optional().describe('お子様連れ'),
  wifi: z.string().optional().describe('WiFi'),
  coupon_urls: CouponUrlsSchema.optional().describe('クーポンURL'),
});

export const GourmetSearchResponseSchema = z.object({
  results: z.object({
    api_version: z.string().describe('APIバージョン'),
    results_available: z.coerce.number().describe('検索結果の全件数'),
    results_returned: z.coerce.number().describe('検索結果の最大出力データ数'),
    results_start: z.coerce.number().describe('検索結果の開始位置'),
    shop: z.array(GourmetSearchShopSchema).describe('店舗情報'),
  }),
});

// TypeScript型のエクスポート
export type GourmetSearchShop = z.infer<typeof GourmetSearchShopSchema>;
export type GourmetSearchResponse = z.infer<typeof GourmetSearchResponseSchema>;
