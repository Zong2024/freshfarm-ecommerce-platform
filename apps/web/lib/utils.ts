import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRegion(origin: string): string {
  if (!origin) return "";

  const cleanOrigin = origin.replace(/[^\u4e00-\u9fa5]/g, "");

  const regions: Record<string, string[]> = {
    北部: ["基隆", "台北", "新北", "桃園", "新竹"],
    中部: ["苗栗", "台中", "彰化", "南投", "雲林"],
    南部: ["嘉義", "台南", "高雄", "屏東"],
    東部: ["宜蘭", "花蓮", "台東"],
    離島: ["澎湖", "金門", "馬祖", "連江", "綠島", "蘭嶼"],
  };

  for (const [region, cities] of Object.entries(regions)) {
    if (cities.some((city) => cleanOrigin.includes(city))) {
      return region;
    }
  }

  return "";
}
