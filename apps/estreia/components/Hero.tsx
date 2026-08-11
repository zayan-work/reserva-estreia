import Image from "next/image";
import { Check } from "./icons";
import LiveCount from "./LiveCount";

/** Hero — editorial photography + headline, one primary button, and the live
 *  count with three reassurances. Reassurance copy is LEGAL-SAFETY (Spec Part 4).
 *
 *  Layout rule that must not regress: the copy panel never reaches the model's
 *  face. The photograph sits in the right 64% of the frame on desktop (the face
 *  lands at ~62–73% of the viewport at every width) while the panel is capped at
 *  46%; on mobile the photo is stacked above the copy, so nothing overlaps at
 *  all. See `.heroMedia` / `.heroPanel` in globals.css. */
export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="heroMedia">
        <Image
          src="/images/campaign/hero-editorial.webp"
          alt="Mulher sorrindo, sentada na cama em luz natural, usando conjunto de lingerie em renda cor vinho"
          fill
          sizes="(min-width: 900px) 64vw, 100vw"
          preload
        />
      </div>

      <div className="heroInner wrap">
        <div className="heroPanel">
          <span className="eyebrow">Coleção de estreia · lista de reserva</span>
          <h1 id="hero-title">
            A primeira coleção. <em>Feita pra você.</em>
          </h1>
          <p className="lede">
            Entre na lista de reserva sem pagar nada agora. Você garante
            prioridade e é a primeira a saber quando a peça chega.
          </p>
          <a href="#reservar" className="heroCta">
            Reservar meu lugar
          </a>

          <div className="heroProof">
            <div className="k">
              <LiveCount />
              <div className="biglabel">pessoas já reservaram</div>
            </div>
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
