import { Chat, Check, Clock, Layers } from "./icons";

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
