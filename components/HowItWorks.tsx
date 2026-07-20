/** How it works — 3 steps. Copy is locked (Spec Part 4). */
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
    <section className="block" aria-labelledby="como-funciona">
      <div className="wrap">
        <div className="head">
          <span className="eyebrow">Como funciona</span>
          <h2 id="como-funciona">Reservar é simples, e não custa nada</h2>
          <p>
            A lista de reserva existe para entender quantas pessoas querem a
            coleção antes de produzir. Você entra na lista, e a gente te avisa.
          </p>
        </div>
        <div className="steps">
          {STEPS.map((s) => (
            <div className="step" key={s.n}>
              <div className="n" aria-hidden="true">
                {s.n}
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
