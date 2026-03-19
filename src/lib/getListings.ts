import { getCollection, type DataEntryMap } from "astro:content";
import { getLangFromUrl } from "../util/i18n";

export async function getListings(Astro: any) {
  const locale = getLangFromUrl(Astro.url);
  const collectionName = locale === "en" ? "directory" : `directory${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
  
  try {
    return await getCollection(collectionName as keyof DataEntryMap);
  } catch (error) {
    // 回退到默认目录
    return await getCollection("directory" as keyof DataEntryMap);
  }
}
