import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* =========================================================================
   Proxy (Next.js 16's renamed Middleware).
   Gate the internal demand dashboard so it NEVER faces the public (Spec §6).
   Protects both the /painel page and its data endpoint /api/stats with HTTP
   Basic Auth. Set PAINEL_USER / PAINEL_PASSWORD in the environment.
   ========================================================================= */

// Keep this ASCII-only: HTTP header values must be latin1 (ByteString).
const REALM = "Estreia Painel Interno";

function unauthorized() {
  return new NextResponse("Autenticacao necessaria.", {
    status: 401,
    headers: { "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"` },
  });
}

export function proxy(request: NextRequest) {
  const expectedUser = process.env.PAINEL_USER || "estreia";
  // Fallback keeps the dashboard protected even if the env var is missing.
  // Override in every real environment (documented in .env.example).
  const expectedPass = process.env.PAINEL_PASSWORD || "trocar-esta-senha";

  const header = request.headers.get("authorization");
  if (!header || !header.startsWith("Basic ")) return unauthorized();

  let decoded = "";
  try {
    decoded = atob(header.slice(6));
  } catch {
    return unauthorized();
  }
  const idx = decoded.indexOf(":");
  const user = idx >= 0 ? decoded.slice(0, idx) : decoded;
  const pass = idx >= 0 ? decoded.slice(idx + 1) : "";

  if (user !== expectedUser || pass !== expectedPass) return unauthorized();

  return NextResponse.next();
}

export const config = {
  matcher: ["/painel", "/painel/:path*", "/api/stats"],
};
