import { ApiResponse, DexScreenerResponse, ProcessedTokenData } from "../types";
import { formatNumber } from "./utils";

const GECKO_TERMINAL_BASE_URL = "https://api.geckoterminal.com/api/v2";
const DEXSCREENER_BASE_URL = "https://api.dexscreener.com/latest/dex/pairs";

const chainIdMap: { [key: string]: string } = {
  eth: "ethereum",
  solana: "solana",
};

export async function fetchTrendingPools(): Promise<ProcessedTokenData[]> {
  const response = await fetch(
    `${GECKO_TERMINAL_BASE_URL}/networks/trending_pools`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = (await response.json()) as ApiResponse;
  const data: ProcessedTokenData[] = [];

  for (const pool of result.data) {
    const network = pool.relationships.network.data.id;
    const chainId = chainIdMap[network] || network;

    try {
      const tokenInfo = await fetchTokenInfo(chainId, pool.attributes.address);
      const pairInfo = tokenInfo.pairs[0];

      if (pairInfo) {
        const baseToken = pairInfo.baseToken;
        const volume24h = parseFloat(pool.attributes.volume_usd.h24 as string);
        const liquidity = pairInfo.liquidity.usd;
        const createTime = new Date(pairInfo.pairCreatedAt).toLocaleString();

        if (liquidity < 50000) continue;

        const item: ProcessedTokenData = {
          Name: `${baseToken.name} (${baseToken.symbol})`,
          "Contract Address": baseToken.address,
          Network: chainId,
          FDV: `$${formatNumber(pairInfo.fdv)}`,
          "24h Volume": `$${formatNumber(volume24h)}`,
          "Logo URL": pairInfo.info.imageUrl || "N/A",
          Liquidity: `$${formatNumber(liquidity)}`,
          Price: `$${pairInfo.priceUsd}`,
          "24h PriceChange": `${pairInfo.priceChange.h24}%`,
          Twitter:
            pairInfo.info.socials.find((s) => s.type === "twitter")?.url ||
            "N/A",
          Website: pairInfo.info.websites[0]?.url || "N/A",
          "DexScreener Url": pairInfo.url,
          createTime,
          _volume24h: volume24h,
        };
        data.push(item);
      }
    } catch (error) {
      console.error(
        `Error fetching data for ${pool.attributes.address}: ${error}`
      );
    }
  }

  data.sort((a, b) => b._volume24h - a._volume24h);
  return data.slice(0, 10);
}

export async function fetchTokenInfo(
  chainId: string,
  pairAddress: string
): Promise<DexScreenerResponse> {
  const response = await fetch(
    `${DEXSCREENER_BASE_URL}/${chainId}/${pairAddress}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return (await response.json()) as DexScreenerResponse;
}
