import * as XLSX from 'xlsx';
import { ProcessedTokenData } from '../types';

export const exportToExcel = (data: ProcessedTokenData[]) => {
  // 首先，按照 24h 交易量倒序排列数据
  const sortedData = [...data].sort((a, b) => b._volume24h - a._volume24h);

  // 创建一个新的数组，移除 _volume24h 字段
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const exportData = sortedData.map(({ _volume24h, ...rest }) => rest);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportData);

  // 设置列宽
  const colWidths = [
    { wch: 30 }, // Name
    { wch: 35 }, // Contract Address
    { wch: 10 }, // Network
    { wch: 10 }, // FDV
    { wch: 10 }, // 24h Volume
    { wch: 30 }, // Logo URL
    { wch: 15 }, // Liquidity
    { wch: 15 }, // Price
    { wch: 15 }, // 24h PriceChange
    { wch: 30 }, // Twitter
    { wch: 30 }, // Website
    { wch: 30 }, // DexScreener Url
    { wch: 20 }, // Create Time
  ];
  ws['!cols'] = colWidths;

  XLSX.utils.book_append_sheet(wb, ws, "Top 10 Trending Tokens");
  XLSX.writeFile(wb, "top_10_trending_tokens.xlsx");
};