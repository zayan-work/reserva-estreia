import { ImageResponse } from "next/og";

// On-brand favicon (replaces the default create-next-app icon).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#4A1830",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 7,
          fontFamily: "serif",
          fontWeight: 700,
        }}
      >
        <span style={{ color: "#ffffff", fontSize: 21 }}>E</span>
        <span style={{ color: "#E8607A", fontSize: 21 }}>.</span>
      </div>
    ),
    { ...size }
  );
}
