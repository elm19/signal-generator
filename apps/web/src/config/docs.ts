/**
 * This file contains the configuration for the documentation
 * to be used by files like:
 * - src/components/command-menu.tsx
 * - src/components/mobile-nav.tsx
 * - src/app/[locale]/docs/layout.tsx
 * - src/lib/opendocs/components/docs/pager.tsx
 */

import type { DocsConfig } from '@/lib/opendocs/types/docs'

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      href: '/docs',
      title: {
        en: 'Documentation',
        pt: 'Documentação',
      },
    },
  ],

  sidebarNav: [
    {
      title: {
        en: 'Getting Started',
        pt: 'Começando',
      },
      items: [
        {
          href: '/docs/overview/project-overview',
          title: {
            en: 'Project Overview',
            pt: 'Visão Geral do Projeto',
          },
          items: [],
        },
        {
          href: '/docs/usage/how-to-use',
          title: {
            en: 'How to Use',
            pt: 'Como Usar',
          },
          items: [],
        },
      ],
    },
    {
      title: {
        en: 'API & Integration',
        pt: 'API e Integração',
      },
      items: [
        {
          href: '/docs/api/api-documentation',
          title: {
            en: 'API Documentation',
            pt: 'Documentação da API',
          },
          items: [],
        },
      ],
    },
    {
      title: {
        en: 'Technical Documentation',
        pt: 'Documentação Técnica',
      },
      items: [
        {
          title: {
            en: 'Data Pipeline',
            pt: 'Pipeline de Dados',
          },
          items: [
            {
              href: '/docs/pipeline/data-collection',
              title: {
                en: 'Data Collection',
                pt: 'Coleta de Dados',
              },
              items: [],
            },
            {
              href: '/docs/pipeline/preprocessing',
              title: {
                en: 'Data Preprocessing',
                pt: 'Pré-processamento',
              },
              items: [],
            },
            {
              href: '/docs/pipeline/feature-engineering',
              title: {
                en: 'Feature Engineering',
                pt: 'Engenharia de Features',
              },
              items: [],
            },
          ],
        },
        {
          title: {
            en: 'Model Training',
            pt: 'Treinamento do Modelo',
          },
          items: [
            {
              href: '/docs/models/supported-models',
              title: {
                en: 'Supported Models',
                pt: 'Modelos Suportados',
              },
              items: [],
            },
            {
              href: '/docs/models/training-methodology',
              title: {
                en: 'Training Methodology',
                pt: 'Metodologia de Treinamento',
              },
              items: [],
            },
          ],
        },
        {
          title: {
            en: 'Performance',
            pt: 'Desempenho',
          },
          items: [
            {
              href: '/docs/performance/backtesting',
              title: {
                en: 'Backtesting',
                pt: 'Backtesting',
              },
              items: [],
            },
            {
              href: '/docs/performance/metrics',
              title: {
                en: 'Performance Metrics',
                pt: 'Métricas de Desempenho',
              },
              items: [],
            },
          ],
        },
      ],
    },
    {
      title: {
        en: 'Development',
        pt: 'Desenvolvimento',
      },
      items: [
        {
          href: '/docs/development/local-setup',
          title: {
            en: 'Local Setup',
            pt: 'Configuração Local',
          },
          items: [],
        },
        {
          href: '/docs/development/contributing',
          title: {
            en: 'Contributing',
            pt: 'Contribuindo',
          },
          items: [],
        },
      ],
    },
    {
      title: {
        en: 'Support',
        pt: 'Suporte',
      },
      items: [
        {
          href: '/docs/support/faq',
          title: {
            en: 'FAQ',
            pt: 'Perguntas Frequentes',
          },
          items: [],
        },
        {
          href: '/docs/support/contact',
          title: {
            en: 'Contact',
            pt: 'Contato',
          },
          items: [],
        },
      ],
    },
  ],
} as const
