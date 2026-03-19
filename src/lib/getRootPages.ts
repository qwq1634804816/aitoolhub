import type { AllContent } from "../types/content";
import { getCollection } from "astro:content";
import config from "@util/themeConfig";

export async function getBlogPages() {
  const allPosts = await getCollection("blog");
  return allPosts.map((entry) => ({params: {slug: entry.id }, props: { entry }}));
}

export async function getRootPages(remapIndex: boolean = true) {
  const allListings = await getCollection("directory");
  const allListingsZh = await getCollection("directoryZh").catch(() => []);
  const allPages = await getCollection("pages");

  // Combine listings and pages
  const combinedEntries: Array<AllContent> = allListings.concat(allPages as never);
  
  // Generate paths for default language (English)
  const defaultPaths: any[] = combinedEntries.map((entry) => {
    let mySlug: string = entry.id;

    if (mySlug === "index" && remapIndex) {
      mySlug = "/";
    }

    return {
      params: { slug: mySlug },
      props: { entry, lang: "en" },
    };
  });
  
  // Add English tag pages
  const tags = config.directoryData?.tags || [];
  tags.forEach((tag) => {
    defaultPaths.push({
      params: { slug: `tags/${tag.key}` },
      props: { lang: "en", tag },
    });
  });
  
  // Generate paths for Chinese language
  const zhPaths: any[] = [];
  
  // Add Chinese home page
  const zhIndexPage = allPages.find(entry => entry.id === "index-zh");
  if (zhIndexPage) {
    zhPaths.push({
      params: { slug: "zh" },
      props: { entry: zhIndexPage, lang: "zh" },
    });
  }
  
  // Add other Chinese pages
  allListingsZh.forEach((entry) => {
    zhPaths.push({
      params: { slug: `zh/${entry.id}` },
      props: { entry, lang: "zh" },
    });
  });
  
  // Add Chinese tag pages
  tags.forEach((tag) => {
    zhPaths.push({
      params: { slug: `zh/tags/${tag.key}` },
      props: { lang: "zh", tag },
    });
  });
  
  // Return all paths
  return [...defaultPaths, ...zhPaths];
}
