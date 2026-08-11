import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Monorepo: trace from the workspace root so files linked in from
  // `packages/*` are included in the build output. Without this Next traces
  // only `apps/estreia` and drops workspace dependencies.
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;
