import { Chat, Check, Clock, Layers } from "./icons";
import Image from "next/image";

/** Right rail — "why join". Static reassurance beside the form (Spec §5). */
const BENEFITS = [
  {
    icon: <Check />,
    title: "Prioridade real",
    body:
      "A lista compra antes do lançamento público. Estoque de estreia é limitado.",
  },
  {
    icon: <Clock />,
    title: "Sem pressa, sem cobrança",
    body:
      "Você reserva agora e decide na hora que a peça chegar. Nada é cobrado hoje.",
  },
  {
    icon: <Chat />,
    title: "A gente te avisa no WhatsApp",
    body: "Um aviso só, quando importa. Sem spam, sem enrolação.",
  },
  {
    icon: <Layers />,
    title: "Sua opinião molda a coleção",
    body:
      "O que você escolhe aqui ajuda a decidir tamanhos e estilos que produzimos primeiro.",
  },
];

export default function Rail() {
  return (
    <div className="rail">
      <figure className="railFigure">
        <Image
          src="/images/05_grupo_inclusivo@2x.webp"
          alt="Mosaico com mulheres de diferentes corpos e tons de pele usando peças da coleção"
          width={1200}
          height={800}
          sizes="(min-width: 861px) 47vw, 92vw"
        />
      </figure>
      <h3>Por que entrar na lista</h3>
      {BENEFITS.map((b) => (
        <div className="b" key={b.title}>
          <div className="bi">{b.icon}</div>
          <div className="bt">
            <b>{b.title}</b>
            <span>{b.body}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
