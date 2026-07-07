import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  estrategiaSidebar: [
    {
      type: 'category',
      label: 'Estratégia de Negócio',
      collapsed: false,
      collapsible: false,
      className: 'sidebar-strategia',
      items: [
        {
          type: 'doc',
          id: 'estrategia/problema-mecanismo-solucao',
          label: 'Problema → Mecanismo → Solução',
        },
        {
          type: 'doc',
          id: 'estrategia/bmc-canvas',
          label: 'BM Canvas',
        },
        {
          type: 'doc',
          id: 'estrategia/project-model-canvas',
          label: 'Project Model Canvas',
        },
        {
          type: 'doc',
          id: 'estrategia/pm-canvas',
          label: 'PM Canvas (Produto)',
        },
        {
          type: 'doc',
          id: 'estrategia/analise-mercado',
          label: 'Análise de Mercado',
        },
        {
          type: 'doc',
          id: 'estrategia/personas',
          label: 'Personas',
        },
        {
          type: 'doc',
          id: 'estrategia/proposta-valor',
          label: 'Proposta de Valor',
        },
        {
          type: 'doc',
          id: 'estrategia/analise-concorrencial',
          label: 'Análise Concorrente',
        },
        {
          type: 'doc',
          id: 'estrategia/go-to-market',
          label: 'Go-to-Market',
        },
        {
          type: 'doc',
          id: 'estrategia/viabilidade-economica',
          label: 'Viabilidade Econômica',
        },
      ],
    },
  ],

  tecnicaSidebar: [
    {
      type: 'category',
      label: 'Técnica & Implementação',
      collapsed: false,
      collapsible: false,
      className: 'sidebar-tecnica',
      items: [
        {
          type: 'doc',
          id: 'tecnica/intro',
          label: 'Introdução Técnica',
        },
        {
          type: 'doc',
          id: 'tecnica/arquitetura',
          label: 'Arquitetura do Sistema',
        },
        {
          type: 'doc',
          id: 'tecnica/tecnologias',
          label: 'Tecnologias Utilizadas',
        },
      ],
    },
  ],
};

export default sidebars;
