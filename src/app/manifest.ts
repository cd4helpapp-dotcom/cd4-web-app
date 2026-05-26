import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CD4 - AI-Based Healthcare Platform",
    short_name: "CD4 AI",
    description:
      "CD4 is an AI-based healthcare platform for voice doctor booking, AI-ready history snapshots, report understanding, prescriptions, and follow-up care.",
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
