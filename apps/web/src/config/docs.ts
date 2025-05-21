/**
 * This file contains the configuration for the documentation
 * to be used by files like:
 * - src/components/command-menu.tsx
 *                 fr: 'Modèles Supportés', src/components/mobile-nav.tsx
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
        fr: 'Documentation',
      },
    },
  ],

  sidebarNav: [
    {
      title: {
        en: 'Getting Started',
        fr: 'Pour Commencer',
      },
      items: [
        {
          href: '/docs/overview/project-overview',
          title: {
            en: 'Project Overview',
            fr: 'Aperçu du Projet',
          },
          items: [],
        },
        {
          href: '/docs/usage/usage',
          title: {
            en: 'How to Use',
            fr: 'Comment Utiliser',
          },
          items: [],
        },
      ],
    },
    {
      title: {
        en: 'API & Integration',
        fr: 'API et Intégration',
      },
      items: [
        {
          href: '/docs/api/api-documentation',
          title: {
            en: 'API Documentation',
            fr: 'Documentation API',
          },
          items: [],
        },
        {
          title: {
            en: 'API Endpoints',
            fr: 'Points de Terminaison API',
          },
          items: [
            {
              href: '/docs/api/endpoint/predict',
              title: {
                en: 'Predict',
                fr: 'Prédire',
              },
              items: [],
            },
            {
              href: '/docs/api/endpoint/models-info',
              title: {
                en: 'Models-info',
                fr: 'Informations sur les Modèles',
              },
              items: [],
            },
          ],
        },
      ],
    },
    {
      title: {
        en: 'Technical Documentation',
        fr: 'Documentation Technique',
      },
      items: [
        {
          title: {
            en: 'Data Pipeline',
            fr: 'Pipeline de Données',
          },
          items: [
            {
              href: '/docs/pipeline/data-collection',
              title: {
                en: 'Data Collection',
                fr: 'Collecte de Données',
              },
              items: [],
            },
            {
              href: '/docs/pipeline/preprocessing',
              title: {
                en: 'Data Preprocessing',
                fr: 'Prétraitement',
              },
              items: [],
            },
            {
              href: '/docs/pipeline/feature-engineering',
              title: {
                en: 'Feature Engineering',
                fr: 'Ingénierie des Caractéristiques',
              },
              items: [],
            },
          ],
        },
        {
          title: {
            en: 'Model Training',
            fr: 'Entraînement du Modèle',
          },
          items: [
            {
              href: '/docs/models/supported-models',
              title: {
                en: 'Supported Models',
                fr: 'Modelos Suportados',
              },
              items: [],
            },
            {
              href: '/docs/models/training-methodology',
              title: {
                en: 'Training Methodology',
                fr: 'Méthodologie d\'Entraînement',
              },
              items: [],
            },
          ],
        },
        {
          title: {
            en: 'Performance',
            fr: 'Performance',
          },
          items: [
            {
              href: '/docs/performance/backtesting',
              title: {
                en: 'Backtesting',
                fr: 'Backtesting',
              },
              items: [],
            },
            {
              href: '/docs/performance/metrics',
              title: {
                en: 'Performance Metrics',
                fr: 'Métriques de Performance',
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
        fr: 'Développement',
      },
      items: [
        {
          href: '/docs/development/local-setup',
          title: {
            en: 'Local Setup',
            fr: 'Configuration Locale',
          },
          items: [],
        },
        {
          href: '/docs/development/contributing',
          title: {
            en: 'Contributing',
            fr: 'Contribuer',
          },
          items: [],
        },
      ],
    },
    {
      title: {
        en: 'Support',
        fr: 'Support',
      },
      items: [
        {
          href: '/docs/support/faq',
          title: {
            en: 'FAQ',
            fr: 'Questions Fréquentes',
          },
          items: [],
        },
        {
          href: '/docs/support/contact',
          title: {
            en: 'Contact',
            fr: 'Contact',
          },
          items: [],
        },
      ],
    },
  ],
} as const
