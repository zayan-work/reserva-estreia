import { ImageResponse } from "next/og";

// Apple touch icon (home-screen shortcut).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
        <span style={{ color: "#ffffff", fontSize: 104 }}>E</span>
        <span style={{ color: "#E8607A", fontSize: 104 }}>.</span>
      </div>
    ),
    { ...size }
  );
}
