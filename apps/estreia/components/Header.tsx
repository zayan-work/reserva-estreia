/** Sticky header — logo left, "Reservar meu lugar" right. Hides CTA on the
 *  smallest screens to save room (Spec §Page Structure 1). */
export default function Header() {
  return (
    <header>
      <div className="wrap bar">
        <a href="#top" className="logo" aria-label="Estreia — início">
          Estreia<span>.</span>
        </a>
        <a href="#reservar" className="barcta hide-sm">
          Reservar meu lugar
        </a>
      </div>
    </header>
  );
}
