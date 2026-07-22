import Image from "next/image";

/** How it works — 3 steps beside the lingerie detail shot (v0.0.2 spec §2.2).
 *  Step copy is locked (Spec Part 4); the section heading follows the v0.0.2
 *  content spec. */
const STEPS = [
  {
    n: 1,
    title: "Você reserva",
    body:
      "Deixa nome, WhatsApp e o tamanho que prefere. Leva menos de um minuto e não tem cobrança.",
  },
  {
    n: 2,
    title: "A gente produz",
    body:
      "Com a lista formada, a coleção entra em produção no Brasil, feita para caber de verdade.",
  },
  {
    n: 3,
    title: "Você é avisada primeiro",
    body:
      "Quando a peça chega, quem está na lista recebe o aviso antes de todo mundo e compra com prioridade.",
  },
];

export default function HowItWorks() {
  return (
    <section className="block hiw" aria-labelledby="como-funciona">
      <div className="wrap">
        <div className="head">
          <span className="eyebrow">Como funciona</span>
          <h2 id="como-funciona">
            Qualidade que você sente. Processo que respeita você.
          </h2>
          <p>
            A lista de reserva existe para entendermos exatamente o que você
            quer antes de produzir. Sem desperdício, com foco absoluto na
            qualidade e no caimento perfeito para o seu corpo.
          </p>
        </div>

        <figure className="hiwFigure">
          <Image
            src="/images/campaign/lingerie-detail.webp"
            alt="Detalhe de um conjunto de lingerie em renda vinho com bordado dourado sobre cetim"
            width={928}
            height={1152}
            sizes="(min-width: 900px) 47vw, 92vw"
          />
        </figure>

        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <div className="n" aria-hidden="true">
                {s.n}
              </div>
              <div className="stepBody">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
