/**
 * Editorial carousel content — "Opções & estilos". Titles and body copy are
 * the "Título exibido" / "Texto exibido" columns from the v0.0.2 content spec
 * (tmp/v0.0.2/Website.docx, section 4); the order is fixed.
 *
 * Every image is 928×1152 WebP in /public/images/campaign. `alt` describes the
 * photograph actually shipped, not the shot brief.
 */
export type Style = {
  src: string;
  alt: string;
  label: string;
  body: string;
};

export const STYLES: Style[] = [
  {
    src: "/images/campaign/style-01.webp",
    alt: "Mulher sentada junto à janela usando conjunto de renda cor vinho",
    label: "Sofisticação",
    body: "Renda que celebra presença e personalidade.",
  },
  {
    src: "/images/campaign/style-02.webp",
    alt: "Mulher com conjunto de renda rosa e blazer creme sobre os ombros",
    label: "Alfaiataria leve",
    body: "Delicadeza, cor e confiança para todos os dias.",
  },
  {
    src: "/images/campaign/style-03.webp",
    alt: "Mulher com conjunto de renda em tons de rosa e vinho com cinta-liga",
    label: "Renda em cor",
    body: "Texturas feitas para se notar no toque.",
  },
  {
    src: "/images/campaign/style-04.webp",
    alt: "Mulher com conjunto claro de renda e detalhes dourados em luz natural",
    label: "Clareza dourada",
    body: "Leveza que ilumina a sua rotina.",
  },
  {
    src: "/images/campaign/style-05.webp",
    alt: "Mulher com top e calcinha de cintura alta em tom creme, em casa",
    label: "Conforto real",
    body: "Sustentação, suavidade e caimento pensado.",
  },
  {
    src: "/images/campaign/style-06.webp",
    alt: "Mulher com curvas usando conjunto de renda cor vinho junto à janela",
    label: "Feita para curvas",
    body: "Proporção, conforto e beleza sem concessões.",
  },
  {
    src: "/images/campaign/style-07.webp",
    alt: "Mulher em loungewear creme sentada no sofá abraçando uma almofada",
    label: "Ritual de pausa",
    body: "Acolhimento começa naquilo que toca a pele.",
  },
  {
    src: "/images/campaign/style-08.webp",
    alt: "Mulher em loungewear cor vinho sentada no sofá de uma sala acolhedora",
    label: "Comunidade",
    body: "Feita para compartilhar momentos com quem você ama.",
  },
];
