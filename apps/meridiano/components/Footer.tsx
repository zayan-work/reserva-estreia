import type { Dictionary } from "@/lib/content";

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="footer">
      <div className="shell">
        <p>{t.footer.copyright}</p>
        <p className="built">{t.footer.builtIn}</p>
      </div>
    </footer>
  );
}
