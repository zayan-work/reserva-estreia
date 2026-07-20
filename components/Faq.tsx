import { FAQ } from "@/lib/faq";

/** FAQ — five questions, native <details> (works without JS). Copy locked. */
export default function Faq() {
  return (
    <section className="block faq" aria-labelledby="faq-title">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="head">
          <span className="eyebrow">Perguntas</span>
          <h2 id="faq-title">Tudo que você quer saber</h2>
        </div>
        {FAQ.map((item, i) => (
          <details key={item.q} open={i === 0}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
