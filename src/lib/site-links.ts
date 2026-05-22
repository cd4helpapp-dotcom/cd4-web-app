import { DownloadLink } from "@/types/landing";

const downloadEnvMap: Record<DownloadLink["id"], string | undefined> = {
  android_store: process.env.NEXT_PUBLIC_ANDROID_STORE_URL,
  ios_store: process.env.NEXT_PUBLIC_IOS_STORE_URL,
  apk: process.env.NEXT_PUBLIC_APK_URL
};

export function resolveDownloadLinks(links: DownloadLink[]): DownloadLink[] {
  return links.map((link) => {
    const envValue = downloadEnvMap[link.id]?.trim();
    if (!envValue) return link;
    return {
      ...link,
      href: envValue,
      comingSoon: false
    };
  });
}
