import { ImageResponse } from "next/og";

/** Favicon - the gold wordmark initial on emerald. */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F3A2E",
          color: "#D6B35A",
          fontSize: 21,
        }}
      >
        M
      </div>
    ),
    size,
  );
}
