import { ImageResponse } from "next/og";
import { getDictionary } from "@/lib/content";

/**
 * Social share card (1200×630) - what appears when the link is sent on
 * WhatsApp, LinkedIn or email. Institutional, not promotional.
 *
 * Flexbox only (a satori constraint) and the built-in font, so the build has no
 * network dependency. To ship Maria's artwork instead, drop an
 * `opengraph-image.png` into this `app/` folder - a static file of that name
 * takes precedence over this generator automatically.
 */
const t = getDictionary("en");

export const alt = `Meridiano · ${t.hero.subline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F3A2E",
          position: "relative",
        }}
      >
        {/* thin gold frame - the "old coin, seal, maison insignia" register */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            right: 36,
            bottom: 36,
            border: "1px solid rgba(214,179,90,0.32)",
            display: "flex",
          }}
        />

        <div
          style={{
            fontSize: 92,
            letterSpacing: 26,
            color: "#D6B35A",
            display: "flex",
            marginLeft: 26,
          }}
        >
          MERIDIANO
        </div>

        <div
          style={{
            width: 64,
            height: 1,
            background: "#D6B35A",
            opacity: 0.6,
            margin: "36px 0",
            display: "flex",
          }}
        />

        <div
          style={{
            fontSize: 24,
            letterSpacing: 6,
            color: "#EFE5D6",
            textAlign: "center",
            maxWidth: 760,
            lineHeight: 1.6,
            display: "flex",
            marginLeft: 6,
          }}
        >
          A BRAZILIAN CREATOR-LED HOUSE OF APPAREL AND BEAUTY
        </div>
      </div>
    ),
    size,
  );
}
