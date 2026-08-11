import type { Dictionary } from "../types";

/**
 * Spanish (es-ES) — ⚠️ UNREVIEWED FIRST DRAFT / STUB.
 * These strings are a machine draft seeded so the file type-checks and the site
 * renders if you flip ACTIVE_LOCALE to "es". REPLACE with the reviewed Spanish
 * copy you provide. Keep the object shape identical to pt/en (TypeScript will
 * flag any missing key). "WhatsApp", "Pix", and "LGPD" are kept as-is.
 */
export const es = {
  meta: {
    title: "Reserva tu lugar · Colección Estreia",
    titleTemplate: "%s · Estreia",
    description:
      "La primera colección Estreia. Únete a la lista de reserva sin pagar nada ahora: aseguras prioridad y eres la primera en saber cuándo llega la pieza. Hecha para ti, producida en Brasil.",
    keywords: [
      "lista de reserva",
      "colección de estreno",
      "lencería brasileña",
      "loungewear",
      "moda íntima",
      "reserva sin compromiso",
      "producido en Brasil",
    ],
    ogImageAlt:
      "Estreia — La primera colección. Hecha para ti. Lista de reserva sin compromiso.",
    manifestName: "Estreia — Lista de reserva",
    manifestShortName: "Estreia",
    painelTitle: "Panel de demanda",
  },

  skipLink: "Saltar a la reserva",

  header: {
    logoAria: "Estreia — inicio",
    cta: "Reservar mi lugar",
  },

  hero: {
    imageAlt:
      "Mujer sonriendo, sentada en la cama con luz natural, usando un conjunto de lencería de encaje color vino",
    eyebrow: "Colección de estreno · lista de reserva",
    titleLead: "La primera colección.",
    titleEm: "Hecha para ti.",
    lede:
      "Únete a la lista de reserva sin pagar nada ahora. Aseguras prioridad y eres la primera en saber cuándo llega la pieza.",
    cta: "Reservar mi lugar",
    proofLabel: "personas ya reservaron",
    proof: [
      { pre: "", bold: "Sin cargo ahora.", post: " No pagas nada por reservar." },
      { pre: "", bold: "Acceso prioritario.", post: " Quien reserva compra primero." },
      { pre: "", bold: "Cero compromiso.", post: " Reservar no es comprar." },
    ],
  },

  trustStrip: [
    { pre: "", bold: "Sin pago", post: " para entrar en la lista" },
    { pre: "Aviso por ", bold: "WhatsApp", post: " cuando llegue" },
    { pre: "Producido en ", bold: "Brasil", post: "" },
    { pre: "Tú eliges ", bold: "talla y estilo", post: "" },
  ],

  howItWorks: {
    eyebrow: "Cómo funciona",
    heading: "Calidad que sientes. Un proceso que te respeta.",
    intro:
      "La lista de reserva existe para entender exactamente lo que quieres antes de producir. Sin desperdicio, con foco absoluto en la calidad y en el ajuste perfecto para tu cuerpo.",
    imageAlt:
      "Detalle de un conjunto de lencería de encaje vino con bordado dorado sobre satén",
    steps: [
      {
        title: "Tú reservas",
        body:
          "Deja tu nombre, WhatsApp y la talla que prefieres. Toma menos de un minuto y no tiene cargo.",
      },
      {
        title: "Nosotros producimos",
        body:
          "Con la lista formada, la colección entra en producción en Brasil, hecha para quedar de verdad.",
      },
      {
        title: "Te avisamos primero",
        body:
          "Cuando la pieza llega, quien está en la lista recibe el aviso antes que nadie y compra con prioridad.",
      },
    ],
  },

  collection: {
    eyebrow: "Opciones y estilos",
    heading: "La colección, a tu manera.",
    intro:
      "Cortes, colores y texturas para acompañar diferentes momentos, estilos y cuerpos. Porque la comodidad también es reconocerte en la pieza.",
    trackAria: "Carrusel de opciones y estilos de la colección",
    prevAria: "Ver estilos anteriores",
    nextAria: "Ver más estilos",
    styles: [
      {
        alt: "Mujer sentada junto a la ventana usando un conjunto de encaje color vino",
        label: "Sofisticación",
        body: "Encaje que celebra presencia y personalidad.",
      },
      {
        alt: "Mujer con conjunto de encaje rosa y blazer crema sobre los hombros",
        label: "Sastrería ligera",
        body: "Delicadeza, color y confianza para cada día.",
      },
      {
        alt: "Mujer con conjunto de encaje en tonos rosa y vino con liguero",
        label: "Encaje en color",
        body: "Texturas hechas para notarse al tacto.",
      },
      {
        alt: "Mujer con conjunto claro de encaje y detalles dorados en luz natural",
        label: "Claridad dorada",
        body: "Ligereza que ilumina tu rutina.",
      },
      {
        alt: "Mujer con top y braguita de cintura alta en tono crema, en casa",
        label: "Comodidad real",
        body: "Sujeción, suavidad y un ajuste pensado.",
      },
      {
        alt: "Mujer con curvas usando un conjunto de encaje color vino junto a la ventana",
        label: "Hecha para curvas",
        body: "Proporción, comodidad y belleza sin concesiones.",
      },
      {
        alt: "Mujer en loungewear crema sentada en el sofá abrazando un cojín",
        label: "Ritual de pausa",
        body: "El cuidado empieza por lo que toca tu piel.",
      },
      {
        alt: "Mujer en loungewear color vino sentada en el sofá de una sala acogedora",
        label: "Comunidad",
        body: "Hecha para compartir momentos con quien amas.",
      },
    ],
  },

  reservation: {
    srHeading: "Reserva tu lugar en la colección de estreno",
    form: {
      heading: "Asegura tu lugar en el estreno",
      sub:
        "Tu reserva es gratuita y garantiza acceso prioritario a la colección antes del lanzamiento oficial.",
      nameLabel: "Nombre",
      namePlaceholder: "Cómo quieres que te llamemos",
      whatsappLabel: "WhatsApp",
      whatsappPlaceholder: "(11) 90000-0000",
      emailLabel: "Correo electrónico",
      emailOptional: "(opcional)",
      emailPlaceholder: "tu@correo.com",
      sizeLegend: "Talla de interés",
      categoryLegend: "¿Qué quieres ver primero?",
      categoryLabels: {
        lingerie: "Lencería",
        loungewear: "Loungewear",
        body: "Body",
        basicos: "Básicos del día a día",
      },
      deposit: {
        pixMark: "pix",
        pix: "Asegurar con una seña reembolsable",
        badge: "Próximamente",
        text:
          "En una próxima fase, quien quiera podrá asegurar la reserva con una seña simbólica y 100 % reembolsable vía Pix. Aún no está activo.",
      },
      submit: "Reservar mi lugar",
      submitting: "Reservando…",
      micro: {
        pre:
          "Reservar no es comprar y no genera ningún cargo. Guardamos tus datos solo para avisarte sobre la colección, conforme a nuestra ",
        linkLabel: "Política de Privacidad",
        post: " y la LGPD. Puedes salir de la lista cuando quieras.",
      },
      success: {
        heading: "¡Lugar reservado!",
        body:
          "Estás en la lista de prioridad. Te escribiremos por WhatsApp en cuanto llegue la colección.",
        queueLabel: "Este es tu número en la fila.",
      },
      errors: {
        name: "Falta tu nombre",
        whatsapp: "Revisa el WhatsApp",
        email: "Revisa el correo",
        form: "No pudimos reservar ahora. Inténtalo de nuevo en un momento.",
        offline: "Sin conexión. Revisa tu internet e inténtalo de nuevo.",
        invalidPayload: "Envío inválido",
        saveFailed: "No pudimos guardar ahora. Inténtalo de nuevo.",
      },
    },
    rail: {
      imageAlt:
        "Mosaico con mujeres de diferentes cuerpos y tonos de piel usando piezas de la colección",
      heading: "Por qué entrar en la lista",
      benefits: [
        {
          title: "Prioridad real",
          body:
            "La lista compra antes del lanzamiento público. El stock de estreno es limitado.",
        },
        {
          title: "Sin prisa, sin cargo",
          body:
            "Reservas ahora y decides cuando la pieza llegue. Hoy no se cobra nada.",
        },
        {
          title: "Te avisamos por WhatsApp",
          body: "Un solo aviso, cuando importa. Sin spam, sin rodeos.",
        },
        {
          title: "Tu opinión moldea la colección",
          body:
            "Lo que eliges aquí ayuda a decidir las tallas y estilos que producimos primero.",
        },
      ],
    },
  },

  faq: {
    eyebrow: "Preguntas",
    heading: "Todo lo que quieres saber",
    items: [
      {
        q: "¿Reservar cuesta algo?",
        a: "No. Reservar es gratuito y no genera ningún cargo. Solo entras en la lista de prioridad y te avisamos cuando llegue la colección.",
      },
      {
        q: "¿Reservar es lo mismo que comprar?",
        a: "No. La reserva solo garantiza que te enteras primero y tienes prioridad de compra. La decisión de comprar es tuya, cuando la pieza esté disponible.",
      },
      {
        q: "¿Cómo me van a avisar?",
        a: "Por el WhatsApp que dejes, y por correo si quieres. Un solo aviso, cuando llegue la colección. Nada de spam.",
      },
      {
        q: "¿Y si cambio de idea?",
        a: "Sin problema. Puedes salir de la lista cuando quieras, solo responde el WhatsApp pidiendo cancelar. Tus datos se tratan conforme a la LGPD.",
      },
      {
        q: "¿Cuándo llega la colección?",
        a: "Estamos formando la lista ahora para definir la producción. Quien reserva es la primera en saber la fecha exacta, antes del lanzamiento público.",
      },
    ],
  },

  footer: {
    tagline:
      "Lista de reserva de la colección de estreno. Reservar es gratuito y sin compromiso.",
    legal:
      "Tus datos se usan solo para avisarte sobre la colección, conforme a la LGPD (Ley 13.709/2018). No se cobra ningún pago en esta etapa.",
    cta: "Reservar mi lugar",
  },

  og: {
    eyebrow: "COLECCIÓN DE ESTRENO · LISTA DE RESERVA",
    titleLead: "La primera colección. ",
    titleEm: "Hecha para ti.",
    subtitle:
      "Reserva tu lugar sin pagar nada ahora. Acceso prioritario y aviso por WhatsApp cuando llegue la pieza.",
    badge: "Sin cargo · Sin compromiso",
  },

  dashboard: {
    refresh: "↻ Actualizar",
    refreshing: "Actualizando…",
    eyebrow: "Panel de demanda · interno",
    heading: "Lo que dice la lista",
    intro:
      "Lectura en vivo del test. Esta sección es para el equipo, no para el público — está detrás de una contraseña.",
    loadError: "No fue posible cargar los números ahora.",
    retry: "Intentar de nuevo",
    kpis: {
      reservations: { label: "Reservas", desc: "total en la lista" },
      conversion: { label: "Conversión", desc: "visita → reserva" },
      whatsapp: { label: "Con WhatsApp", desc: "contacto fuerte" },
      topSize: { label: "Talla top", desc: "más pedida" },
    },
    categoryHeading: "Interés por categoría",
    categoryLabels: {
      lingerie: "Lencería",
      loungewear: "Loungewear",
      body: "Body",
      basicos: "Básicos",
    },
    decisionRule: {
      pre:
        "Regla de decisión: solo avanzamos al primer pedido si las reservas superan el límite acordado ",
      and: "Y",
      post:
        " si la difusión de la embajadora trae el tráfico previsto. Uno sin el otro, pausamos.",
    },
    meta: {
      goalLabel: "Meta de reservas:",
      currentLabel: "actual:",
      statusClears: "límite alcanzado ✓",
      statusBelow: "aún por debajo del límite",
      visitsLabel: "Visitas contadas:",
    },
  },
} satisfies Dictionary;
