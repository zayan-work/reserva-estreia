import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

/**
 * Generated social-share image (1200×630) — the preview when the ambassador
 * shares the link (Spec §1.5, §5.3). This is an on-brand INTERIM: to use
 * Maria's real photo instead, drop an `opengraph-image.jpg` (or .png) into
 * this `app/` folder and it takes precedence over this file automatically.
 *
 * Uses flexbox only (satori constraint) and the built-in font for build
 * robustness — no runtime network dependency.
 */
export const alt = SITE.ogImageAlt;
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #4A1830 0%, #33101F 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* rose glow */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(232,96,122,0.55), rgba(232,96,122,0) 68%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            color: "#C99A5B",
            fontWeight: 600,
          }}
        >
          COLEÇÃO DE ESTREIA · LISTA DE RESERVA
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -1,
            }}
          >
            <span style={{ color: "#ffffff" }}>A primeira coleção.&nbsp;</span>
            <span style={{ color: "#E8607A", fontStyle: "italic" }}>
              Feita pra você.
            </span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 32,
              color: "#F7E4E9",
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            Reserve seu lugar sem pagar nada agora. Prioridade de acesso e aviso
            no WhatsApp quando a peça chegar.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 46, fontWeight: 700 }}>
            <span style={{ color: "#ffffff" }}>Estreia</span>
            <span style={{ color: "#E8607A" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "14px 28px",
              borderRadius: 999,
              background: "rgba(247,228,233,0.12)",
              border: "1px solid rgba(247,228,233,0.28)",
              color: "#F7E4E9",
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            Sem cobrança · Sem compromisso
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
