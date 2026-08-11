import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Monorepo: trace from the workspace root so workspace-linked packages are
  // included in the build output.
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;
