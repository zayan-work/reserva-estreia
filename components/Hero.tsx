import { Check } from "./icons";
import LiveCount from "./LiveCount";

/** Hero — headline, subhead, one primary button, and the live-count card with
 *  three reassurances. Reassurance copy is LEGAL-SAFETY (Spec Part 4). */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div>
          <span className="eyebrow">Coleção de estreia · lista de reserva</span>
          <h1 id="hero-title">
            A primeira coleção. <em>Feita pra você.</em>
          </h1>
          <p className="lede">
            Entre na lista de reserva sem pagar nada agora. Você garante
            prioridade e é a primeira a saber quando a peça chega.
          </p>
          <a
            href="#reservar"
            className="barcta"
            style={{ padding: "14px 26px", fontSize: ".95rem" }}
          >
            Reservar meu lugar
          </a>
        </div>

        <div className="heroCard">
          <div className="k">
            <LiveCount />
            <div className="biglabel">pessoas já reservaram</div>
            <div className="rule" />
            <ul>
              <li>
                <span className="tick">
                  <Check />
                </span>
                <div>
                  <b>Sem cobrança agora.</b> Você não paga nada para reservar.
                </div>
              </li>
              <li>
                <span className="tick">
                  <Check />
                </span>
                <div>
                  <b>Prioridade de acesso.</b> Quem reserva compra primeiro.
                </div>
              </li>
              <li>
                <span className="tick">
                  <Check />
                </span>
                <div>
                  <b>Zero compromisso.</b> Reservar não é comprar.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
