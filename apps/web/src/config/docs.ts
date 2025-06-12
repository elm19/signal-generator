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
          href: '/docs/api/overview',
          title: {
            en: 'API Overview',
            fr: 'API Overview',
          },
          items: [],
        },
        {
          href: '/docs/api/reference',
          title: {
            en: 'API Reference',
            fr: 'Points de Terminaison API',
          },
          items: [],
        },
      ],
    },
    {
      title: {
        en: 'Core Concepts',
        fr: 'Concepts Clés',
      },
      items: [
        {
          href: '/docs/core-concepts/data-signal',
          title: {
            en: 'From Data to Signals',
            fr: 'Des Données aux Signaux',
          },
          items: [],
        },
        {
          href: '/docs/core-concepts/backtesting',
          title: {
            en: 'Backtesting',
            fr: 'Backtesting',
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
                fr: "Méthodologie d'Entraînement",
              },
              items: [],
            },
          ],
        },
        {
          href: '/docs/core-concepts/prediction-utilization',
          title: {
            en: 'Leveraging Prediction Probabilities',
            fr: 'Exploitation des Probabilités de Prédiction',
          },
          items: [],
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
