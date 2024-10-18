export function formatNumber(num: number): string {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(2) + "K";
    return num.toFixed(2);
  }
  
  export function parseFormattedNumber(str: string): number {
    const num = parseFloat(str.replace(/[^0-9.-]+/g, ""));
    if (str.includes("B")) return num * 1e9;
    if (str.includes("M")) return num * 1e6;
    if (str.includes("K")) return num * 1e3;
    return num;
  }