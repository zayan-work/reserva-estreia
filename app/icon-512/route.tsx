import { ImageResponse } from "next/og";

// 512×512 PWA/maskable icon referenced by the web manifest. Background fills
// the whole square so it stays clean under a maskable (circular) crop.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #4A1830, #33101F)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          fontWeight: 700,
        }}
      >
        <span style={{ color: "#ffffff", fontSize: 300 }}>E</span>
        <span style={{ color: "#E8607A", fontSize: 300 }}>.</span>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
