import type { Dictionary } from "../types";

/**
 * Portuguese (pt-BR) — the source of truth. This is a faithful extraction of
 * the copy currently hard-coded in the components/lib. The LEGAL-SAFETY strings
 * (hero reassurances, first two FAQ answers, footer legal line, form micro copy)
 * must NOT be reworded without Rengan (Spec Part 4).
 */
export const pt = {
  meta: {
    title: "Reserve seu lugar · Coleção Estreia",
    titleTemplate: "%s · Estreia",
    description:
      "A primeira coleção Estreia. Entre na lista de reserva sem pagar nada agora: você garante prioridade e é a primeira a saber quando a peça chega. Feita pra você, produzida no Brasil.",
    keywords: [
      "lista de reserva",
      "coleção de estreia",
      "lingerie brasileira",
      "loungewear",
      "moda íntima",
      "reserva sem compromisso",
      "produzido no Brasil",
    ],
    ogImageAlt:
      "Estreia — A primeira coleção. Feita pra você. Lista de reserva sem compromisso.",
    manifestName: "Estreia — Lista de reserva",
    manifestShortName: "Estreia",
    painelTitle: "Painel de demanda",
  },

  skipLink: "Pular para a reserva",

  header: {
    logoAria: "Estreia — início",
    cta: "Reservar meu lugar",
  },

  hero: {
    imageAlt:
      "Mulher sorrindo, sentada na cama em luz natural, usando conjunto de lingerie em renda cor vinho",
    eyebrow: "Coleção de estreia · lista de reserva",
    titleLead: "A primeira coleção.",
    titleEm: "Feita pra você.",
    lede:
      "Entre na lista de reserva sem pagar nada agora. Você garante prioridade e é a primeira a saber quando a peça chega.",
    cta: "Reservar meu lugar",
    proofLabel: "pessoas já reservaram",
    proof: [
      { pre: "", bold: "Sem cobrança agora.", post: " Você não paga nada para reservar." },
      { pre: "", bold: "Prioridade de acesso.", post: " Quem reserva compra primeiro." },
      { pre: "", bold: "Zero compromisso.", post: " Reservar não é comprar." },
    ],
  },

  trustStrip: [
    { pre: "", bold: "Sem pagamento", post: " para entrar na lista" },
    { pre: "Aviso por ", bold: "WhatsApp", post: " quando chegar" },
    { pre: "Produzido no ", bold: "Brasil", post: "" },
    { pre: "Você escolhe ", bold: "tamanho e estilo", post: "" },
  ],

  howItWorks: {
    eyebrow: "Como funciona",
    heading: "Qualidade que você sente. Processo que respeita você.",
    intro:
      "A lista de reserva existe para entendermos exatamente o que você quer antes de produzir. Sem desperdício, com foco absoluto na qualidade e no caimento perfeito para o seu corpo.",
    imageAlt:
      "Detalhe de um conjunto de lingerie em renda vinho com bordado dourado sobre cetim",
    steps: [
      {
        title: "Você reserva",
        body:
          "Deixa nome, WhatsApp e o tamanho que prefere. Leva menos de um minuto e não tem cobrança.",
      },
      {
        title: "A gente produz",
        body:
          "Com a lista formada, a coleção entra em produção no Brasil, feita para caber de verdade.",
      },
      {
        title: "Você é avisada primeiro",
        body:
          "Quando a peça chega, quem está na lista recebe o aviso antes de todo mundo e compra com prioridade.",
      },
    ],
  },

  collection: {
    eyebrow: "Opções & estilos",
    heading: "A coleção, do seu jeito.",
    intro:
      "Modelagens, cores e texturas para acompanhar diferentes momentos, estilos e corpos. Porque conforto também é se reconhecer na peça.",
    trackAria: "Carrossel de opções e estilos da coleção",
    prevAria: "Ver estilos anteriores",
    nextAria: "Ver mais estilos",
    styles: [
      {
        alt: "Mulher sentada junto à janela usando conjunto de renda cor vinho",
        label: "Sofisticação",
        body: "Renda que celebra presença e personalidade.",
      },
      {
        alt: "Mulher com conjunto de renda rosa e blazer creme sobre os ombros",
        label: "Alfaiataria leve",
        body: "Delicadeza, cor e confiança para todos os dias.",
      },
      {
        alt: "Mulher com conjunto de renda em tons de rosa e vinho com cinta-liga",
        label: "Renda em cor",
        body: "Texturas feitas para se notar no toque.",
      },
      {
        alt: "Mulher com conjunto claro de renda e detalhes dourados em luz natural",
        label: "Clareza dourada",
        body: "Leveza que ilumina a sua rotina.",
      },
      {
        alt: "Mulher com top e calcinha de cintura alta em tom creme, em casa",
        label: "Conforto real",
        body: "Sustentação, suavidade e caimento pensado.",
      },
      {
        alt: "Mulher com curvas usando conjunto de renda cor vinho junto à janela",
        label: "Feita para curvas",
        body: "Proporção, conforto e beleza sem concessões.",
      },
      {
        alt: "Mulher em loungewear creme sentada no sofá abraçando uma almofada",
        label: "Ritual de pausa",
        body: "Acolhimento começa naquilo que toca a pele.",
      },
      {
        alt: "Mulher em loungewear cor vinho sentada no sofá de uma sala acolhedora",
        label: "Comunidade",
        body: "Feita para compartilhar momentos com quem você ama.",
      },
    ],
  },

  reservation: {
    srHeading: "Reserve seu lugar na coleção de estreia",
    form: {
      heading: "Garanta seu lugar na estreia",
      sub:
        "Sua reserva é gratuita e garante acesso prioritário à coleção antes do lançamento oficial.",
      nameLabel: "Nome",
      namePlaceholder: "Como você quer ser chamada",
      whatsappLabel: "WhatsApp",
      whatsappPlaceholder: "(11) 90000-0000",
      emailLabel: "E-mail",
      emailOptional: "(opcional)",
      emailPlaceholder: "voce@email.com",
      sizeLegend: "Tamanho de interesse",
      categoryLegend: "O que você mais quer ver primeiro?",
      categoryLabels: {
        lingerie: "Lingerie",
        loungewear: "Loungewear",
        body: "Body",
        basicos: "Básicos do dia a dia",
      },
      deposit: {
        pixMark: "pix",
        pix: "Garantir com sinal reembolsável",
        badge: "Em breve",
        text:
          "Em uma próxima fase, quem quiser poderá garantir a reserva com um sinal simbólico e 100% reembolsável via Pix. Ainda não está ativo.",
      },
      submit: "Reservar meu lugar",
      submitting: "Reservando…",
      micro: {
        pre:
          "Reservar não é comprar e não gera cobrança. Guardamos seus dados apenas para te avisar sobre a coleção, conforme a ",
        linkLabel: "Política de Privacidade",
        post: " e a LGPD. Você pode sair da lista quando quiser.",
      },
      success: {
        heading: "Lugar reservado!",
        body:
          "Você está na lista de prioridade. Vamos te chamar no WhatsApp assim que a coleção chegar.",
        queueLabel: "Esse é o seu número na fila.",
      },
      errors: {
        name: "Falta seu nome",
        whatsapp: "Confere o WhatsApp",
        email: "Confere o e-mail",
        form: "Não deu para reservar agora. Tente de novo em instantes.",
        offline: "Sem conexão. Confira a internet e tente de novo.",
        invalidPayload: "Envio inválido",
        saveFailed: "Não deu para salvar agora. Tente de novo.",
      },
    },
    rail: {
      imageAlt:
        "Mosaico com mulheres de diferentes corpos e tons de pele usando peças da coleção",
      heading: "Por que entrar na lista",
      benefits: [
        {
          title: "Prioridade real",
          body:
            "A lista compra antes do lançamento público. Estoque de estreia é limitado.",
        },
        {
          title: "Sem pressa, sem cobrança",
          body:
            "Você reserva agora e decide na hora que a peça chegar. Nada é cobrado hoje.",
        },
        {
          title: "A gente te avisa no WhatsApp",
          body: "Um aviso só, quando importa. Sem spam, sem enrolação.",
        },
        {
          title: "Sua opinião molda a coleção",
          body:
            "O que você escolhe aqui ajuda a decidir tamanhos e estilos que produzimos primeiro.",
        },
      ],
    },
  },

  faq: {
    eyebrow: "Perguntas",
    heading: "Tudo que você quer saber",
    items: [
      {
        q: "Reservar custa alguma coisa?",
        a: "Não. Reservar é gratuito e não gera nenhuma cobrança. Você só entra na lista de prioridade e é avisada quando a coleção chegar.",
      },
      {
        q: "Reservar é o mesmo que comprar?",
        a: "Não. A reserva só garante que você fica sabendo primeiro e tem prioridade de compra. A decisão de comprar é sua, na hora que a peça estiver disponível.",
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
    ],
  },

  footer: {
    tagline:
      "Lista de reserva da coleção de estreia. Reservar é gratuito e sem compromisso.",
    legal:
      "Seus dados são usados apenas para avisar sobre a coleção, conforme a LGPD (Lei 13.709/2018). Nenhum pagamento é coletado nesta etapa.",
    cta: "Reservar meu lugar",
  },

  og: {
    eyebrow: "COLEÇÃO DE ESTREIA · LISTA DE RESERVA",
    titleLead: "A primeira coleção. ",
    titleEm: "Feita pra você.",
    subtitle:
      "Reserve seu lugar sem pagar nada agora. Prioridade de acesso e aviso no WhatsApp quando a peça chegar.",
    badge: "Sem cobrança · Sem compromisso",
  },

  dashboard: {
    refresh: "↻ Atualizar",
    refreshing: "Atualizando…",
    eyebrow: "Painel de demanda · interno",
    heading: "O que a lista está dizendo",
    intro:
      "Leitura ao vivo do teste. Esta seção é para o time, não para o público — fica atrás de senha.",
    loadError: "Não foi possível carregar os números agora.",
    retry: "Tentar de novo",
    kpis: {
      reservations: { label: "Reservas", desc: "total na lista" },
      conversion: { label: "Conversão", desc: "visita → reserva" },
      whatsapp: { label: "Com WhatsApp", desc: "contato forte" },
      topSize: { label: "Tamanho top", desc: "mais pedido" },
    },
    categoryHeading: "Interesse por categoria",
    categoryLabels: {
      lingerie: "Lingerie",
      loungewear: "Loungewear",
      body: "Body",
      basicos: "Básicos",
    },
    decisionRule: {
      pre:
        "Regra de decisão: só avançamos para o primeiro pedido se as reservas passarem do limite combinado ",
      and: "E",
      post:
        " se a divulgação da embaixadora trouxer o tráfego previsto. Um sem o outro, a gente pausa.",
    },
    meta: {
      goalLabel: "Meta de reservas:",
      currentLabel: "atual:",
      statusClears: "limite atingido ✓",
      statusBelow: "ainda abaixo do limite",
      visitsLabel: "Visitas contadas:",
    },
  },
} satisfies Dictionary;
