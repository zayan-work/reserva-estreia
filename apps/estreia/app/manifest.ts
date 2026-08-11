import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Estreia — Lista de reserva",
    short_name: "Estreia",
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FBF6F2",
    theme_color: SITE.themeColor,
    lang: "pt-BR",
    categories: ["shopping", "lifestyle"],
    icons: [
      { src: "/icon-512", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
