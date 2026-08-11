/** Trust strip — thin wine band, reassurance only (Spec §Page Structure 3). */
export default function TrustStrip() {
  return (
    <div className="strip">
      <div className="wrap">
        <span>
          <b>Sem pagamento</b> para entrar na lista <span className="dot">•</span>
        </span>
        <span>
          Aviso por <b>WhatsApp</b> quando chegar <span className="dot">•</span>
        </span>
        <span>
          Produzido no <b>Brasil</b> <span className="dot">•</span>
        </span>
        <span>
          Você escolhe <b>tamanho e estilo</b>
        </span>
      </div>
    </div>
  );
}
