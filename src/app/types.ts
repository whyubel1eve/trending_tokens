export interface TrendingPool {
  id: string;
  type: string;
  attributes: {
    name: string;
    address: string;
    base_token_price_usd: string;
    quote_token_price_usd: string;
    base_token_price_native_currency: string;
    quote_token_price_native_currency: string;
    base_token_price_quote_token: string;
    quote_token_price_base_token: string;
    pool_created_at: string;
    reserve_in_usd: string;
    fdv_usd: string;
    market_cap_usd: string;
    price_change_percentage: {
      h24?: number;
    };
    transactions: Record<string, unknown>;
    volume_usd: Record<string, unknown>;
  };
  relationships: {
    base_token: { data: { id: string; type: string } };
    quote_token: { data: { id: string; type: string } };
    network: { data: { id: string; type: string } };
    dex: { data: { id: string; type: string } };
  };
}

export interface ApiResponse {
  data: TrendingPool[];
}

export interface DexScreenerResponse {
  schemaVersion: string;
  pairs: {
    chainId: string;
    dexId: string;
    url: string;
    pairAddress: string;
    labels: string[];
    baseToken: {
      address: string;
      name: string;
      symbol: string;
    };
    quoteToken: {
      address: string;
      name: string;
      symbol: string;
    };
    priceNative: string;
    priceUsd: string;
    priceChange: {
      m5: string;
      h1: string;
      h6: string;
      h24: string;
    };
    pairCreatedAt: string;
    liquidity: {
      usd: number;
      base: number;
      quote: number;
    };
    fdv: number;
    marketCap: number;
    info: {
      imageUrl: string;
      websites: { url: string }[];
      socials: { type: string; url: string }[];
    };
    boosts: Record<string, unknown>;
  }[];
}

export interface ProcessedTokenData {
  Name: string;
  "Contract Address": string;
  Network: string;
  FDV: string;
  "24h Volume": string;
  "Logo URL": string;
  Liquidity: string;
  Price: string;
  "24h PriceChange": string;
  Twitter: string;
  Website: string;
  "DexScreener Url": string;
  createTime: string;
  _volume24h: number;
}
