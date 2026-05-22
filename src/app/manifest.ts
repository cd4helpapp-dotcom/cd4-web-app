import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CD4 AI",
    short_name: "CD4 AI",
    description:
      "CD4 AI helps patients book consultations by voice, share AI-ready history snapshots with doctors, and continue care in one app.",
    start_url: "/",
    display: "standalone",
    background_color: "#07090f",
    theme_color: "#07090f",
    icons: [
      {
        src: "/images/cd4-logo.png",
        sizes: "1254x1254",
        type: "image/png"
      },
      {
        src: "/images/cd4-logo.png",
        sizes: "1254x1254",
        type: "image/png"
      }
    ]
  };
}
