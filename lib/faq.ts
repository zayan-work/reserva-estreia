/**
 * FAQ content — single source of truth for both the visible <details> list
 * and the FAQPage JSON-LD (SEO). The first two answers are LEGAL-SAFETY
 * (Spec Part 4): do NOT reword without Rengan.
 */
export const FAQ: { q: string; a: string; legalSafety?: boolean }[] = [
  {
    q: "Reservar custa alguma coisa?",
    a: "Não. Reservar é gratuito e não gera nenhuma cobrança. Você só entra na lista de prioridade e é avisada quando a coleção chegar.",
    legalSafety: true,
  },
  {
    q: "Reservar é o mesmo que comprar?",
    a: "Não. A reserva só garante que você fica sabendo primeiro e tem prioridade de compra. A decisão de comprar é sua, na hora que a peça estiver disponível.",
    legalSafety: true,
  },
  {
    q: "Como vou ser avisada?",
    a: "Pelo WhatsApp que você deixar, e por e-mail se você quiser. Um aviso só, quando a coleção chegar. Nada de spam.",
  },
  {
    q: "E se eu mudar de ideia?",
    a: "Sem problema. Você pode sair da lista quando quiser, é só responder o WhatsApp pedindo para cancelar. Seus dados são tratados conforme a LGPD.",
  },
  {
    q: "Quando a coleção chega?",
    a: "Estamos formando a lista agora para definir a produção. Quem reserva é a primeira a saber a data exata, antes do lançamento público.",
  },
];
