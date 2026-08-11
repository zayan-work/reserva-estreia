import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/**
 * Shared ESLint base for every app in the workspace.
 *
 * The one workspace-specific rule is the cross-app import ban. The two sites
 * deliberately do not share a design layer — Estreia is wine/rose/cream,
 * Meridiano is emerald/gold — and an accidental `../estreia/components/...`
 * import is exactly how that separation rots. Shared code goes through
 * `packages/*`, never through a sibling app.
 */
export const meridianoConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/apps/*", "../../estreia/**", "../../meridiano/**"],
              message:
                "Apps must not import from each other. Put shared code in packages/* — and never share styles or styled components across the two brands.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default meridianoConfig;
