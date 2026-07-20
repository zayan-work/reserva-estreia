/** Footer — logo, what the list is, and the LGPD/privacy line (kept verbatim,
 *  Spec §Page Structure 8). */
export default function Footer() {
  return (
    <footer id="privacidade">
      <div className="wrap">
        <div>
          <div className="logo">
            Estreia<span>.</span>
          </div>
          <p>
            Lista de reserva da coleção de estreia. Reservar é gratuito e sem
            compromisso.
          </p>
          <p className="legal">
            Seus dados são usados apenas para avisar sobre a coleção, conforme a
            LGPD (Lei 13.709/2018). Nenhum pagamento é coletado nesta etapa.
          </p>
        </div>
        <a href="#reservar" className="barcta" style={{ padding: "13px 24px" }}>
          Reservar meu lugar
        </a>
      </div>
    </footer>
  );
}
