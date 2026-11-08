// Dados da empresa em um lugar só: para atualizar telefone, horário ou fotos, edite este arquivo.

export const EMPRESA = {
  nome: 'Móveis e Esquadrias Espíndola',
  whatsapp: '5551984029409',
  whatsappExibicao: '(51) 98402-9409',
  telefone: '555136271806',
  telefoneExibicao: '(51) 3627-1806',
  email: 'esquadriaespindola@live.com',
  endereco: 'R. Sobradinho, 2117',
  cidade: 'Imbé/RS',
  cep: '95625-000',
  instagram: 'https://www.instagram.com/espindola.moveisesquadrias/',
  instagramUsuario: '@espindola.moveisesquadrias',
  facebook: 'https://www.facebook.com/esquadrias.espindola.50',
  rotas:
    'https://www.google.com/maps/dir/?api=1&destination=R.+Sobradinho%2C+2117+-+Imb%C3%A9%2C+RS%2C+95625-000',
  mapaEmbed:
    'https://maps.google.com/maps?q=R.%20Sobradinho%2C%202117%20-%20Imb%C3%A9%2C%20RS%2C%2095625-000&z=16&output=embed',
} as const;

export const HORARIOS = [
  { dias: 'Segunda a sexta', horas: '08h–12h · 13h30–18h' },
  { dias: 'Sábado', horas: '08h–12h' },
  { dias: 'Domingo', horas: 'Fechado', fechado: true },
] as const;

export function linkWhatsapp(mensagem = 'Olá! Vim pelo site e gostaria de um orçamento.'): string {
  return `https://wa.me/${EMPRESA.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Fotos do carrossel do topo: use só fotos grandes, as pequenas ficam borradas em tela cheia */
export const CARROSSEL = [
  { foto: 'img/cozinha-azul-ampla.webp', legenda: 'Cozinha planejada azul-marinho', posicao: 'center 60%' },
  { foto: 'img/cozinha-azul-ilha.webp', legenda: 'Ilha com pia e adega' },
  { foto: 'img/fachada-loja.webp', legenda: 'Nossa loja em Imbé', posicao: '55% center' },
  { foto: 'img/cozinha-azul-pia.webp', legenda: 'Armários e paneleiro sob medida' },
  { foto: 'img/cozinha-mdf.webp', legenda: 'Cozinha em MDF' },
  { foto: 'img/cozinha-azul-armarios.webp', legenda: 'Armários com portas de vidro' },
];

export interface Servico {
  titulo: string;
  texto: string;
  foto?: string;
  chamada: string;
  mensagem: string;
  destaque?: boolean;
}

export const SERVICOS: Servico[] = [
  {
    titulo: 'Móveis sob medida',
    texto:
      'Cozinhas planejadas, ilhas, armários, paneleiros e roupeiros. Desenhados para o espaço exato da sua casa.',
    foto: 'img/cozinha-azul-ilha.webp',
    chamada: 'Orçar móveis',
    mensagem: 'Olá! Vim pelo site e quero um orçamento de móveis sob medida.',
    destaque: true,
  },
  {
    titulo: 'Janelas e venezianas',
    texto: 'Esquadrias de madeira com veneziana, vidro ou as duas coisas.',
    foto: 'img/janela-veneziana-tijolo.jpg',
    chamada: 'Orçar janelas',
    mensagem: 'Olá! Vim pelo site e quero um orçamento de janelas/venezianas.',
  },
  {
    titulo: 'Portas de madeira',
    texto: 'Portas pivotantes, de entrada e internas, com puxador e acabamento à escolha.',
    foto: 'img/porta-pivotante-vidro.jpg',
    chamada: 'Orçar portas',
    mensagem: 'Olá! Vim pelo site e quero um orçamento de portas.',
  },
  {
    titulo: 'Alumínio e vidro temperado',
    texto: 'Esquadrias de alumínio, box, divisórias e tampos de vidro temperado.',
    chamada: 'Orçar alumínio e vidro',
    mensagem: 'Olá! Vim pelo site e quero um orçamento de alumínio/vidro temperado.',
  },
  {
    titulo: 'Salas e painéis',
    texto: 'Painéis de TV, estantes e móveis para a sala.',
    foto: 'img/painel-tv-madeira.jpg',
    chamada: 'Orçar painéis',
    mensagem: 'Olá! Vim pelo site e quero um orçamento de painel/móveis para sala.',
  },
];

export type Categoria = 'cozinhas' | 'portas' | 'janelas' | 'salas';

export const CATEGORIAS: { id: Categoria | 'todos'; nome: string }[] = [
  { id: 'todos', nome: 'Todos' },
  { id: 'cozinhas', nome: 'Cozinhas' },
  { id: 'portas', nome: 'Portas' },
  { id: 'janelas', nome: 'Janelas' },
  { id: 'salas', nome: 'Salas' },
];

export interface Trabalho {
  foto: string;
  legenda: string;
  categoria: Categoria;
  /** fotos originais pequenas ficam em blocos menores para não aparecerem borradas */
  pequena?: boolean;
}

export const TRABALHOS: Trabalho[] = [
  { foto: 'img/cozinha-azul-armarios.webp', legenda: 'Cozinha planejada', categoria: 'cozinhas' },
  { foto: 'img/porta-pivotante-madeira.jpg', legenda: 'Porta pivotante', categoria: 'portas', pequena: true },
  { foto: 'img/cozinha-mdf.webp', legenda: 'Cozinha em MDF', categoria: 'cozinhas' },
  { foto: 'img/janela-veneziana.jpg', legenda: 'Janela com veneziana', categoria: 'janelas', pequena: true },
  { foto: 'img/painel-tv-ripado.jpg', legenda: 'Painel de TV', categoria: 'salas', pequena: true },
  { foto: 'img/cozinha-azul-pia.webp', legenda: 'Cozinha com paneleiro', categoria: 'cozinhas' },
  { foto: 'img/porta-pivotante-fachada.jpg', legenda: 'Porta de entrada', categoria: 'portas', pequena: true },
  { foto: 'img/porta-pivotante-preta.jpg', legenda: 'Porta pivotante preta', categoria: 'portas', pequena: true },
  { foto: 'img/porta-pivotante-branca.jpg', legenda: 'Porta pivotante branca', categoria: 'portas', pequena: true },
  { foto: 'img/janela-veneziana-tijolo.jpg', legenda: 'Janela de madeira', categoria: 'janelas', pequena: true },
  { foto: 'img/cozinha-azul-ilha.webp', legenda: 'Ilha com adega', categoria: 'cozinhas' },
  { foto: 'img/painel-tv-madeira.jpg', legenda: 'Painel em madeira', categoria: 'salas', pequena: true },
  { foto: 'img/portao-madeira.jpg', legenda: 'Portão de madeira', categoria: 'portas', pequena: true },
];

export const FATOS = [
  { titulo: 'Madeira, alumínio e vidro', texto: 'Tudo para a sua obra em um lugar só.' },
  { titulo: 'Feito na medida', texto: 'Cada peça é projetada para o seu vão e o seu espaço.' },
  { titulo: 'Loja aberta em Imbé', texto: 'Seg a sex, 8h–12h e 13h30–18h. Sábado, 8h–12h.' },
  { titulo: 'Orçamento pelo WhatsApp', texto: 'Mande fotos e medidas e receba um retorno.' },
];

export const PASSOS = [
  { titulo: 'Você chama', texto: 'Pelo WhatsApp, telefone ou na loja. Se puder, mande fotos e medidas aproximadas.' },
  { titulo: 'A gente mede', texto: 'Combinamos uma visita para tirar as medidas certas no local.' },
  { titulo: 'Orçamento', texto: 'Você recebe o valor com materiais e acabamento definidos.' },
  { titulo: 'Produção e instalação', texto: 'Fabricamos e entregamos com a instalação pela nossa equipe.' },
];
