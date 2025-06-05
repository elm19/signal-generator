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
      keywords: {
        en: 'docs help guide documentation manual',
        fr: 'docs aide guide documentation manuel',
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
          keywords: {
            en: 'introduction start overview basics getting-started',
            fr: 'introduction démarrage aperçu bases commencer',
          },
          items: [],
        },
        {
          href: '/docs/usage/usage',
          title: {
            en: 'How to Use',
            fr: 'Comment Utiliser',
          },
          keywords: {
            en: 'usage tutorial how-to guide help instructions',
            fr: 'utilisation tutoriel guide aide instructions',
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
          keywords: {
            en: 'api reference endpoints authentication integration developer',
            fr: 'api référence endpoints authentification intégration développeur',
          },
          items: [],
        },
        {
          title: {
            en: 'API Endpoints',
            fr: 'Points de Terminaison API',
          },
          keywords: {
            en: 'api endpoints routes methods requests responses flask',
            fr: 'api endpoints routes méthodes requêtes réponses flask',
          },
          items: [
            {
              href: '/docs/api/endpoint/predict',
              title: {
                en: 'Predict',
                fr: 'Prédire',
              },
              keywords: {
                en: 'predict forecast signals trading prediction model',
                fr: 'prédire prévoir signaux trading prédiction modèle',
              },
              items: [],
            },
            {
              href: '/docs/api/endpoint/models-info',
              title: {
                en: 'Models-info',
                fr: 'Informations sur les Modèles',
              },
              keywords: {
                en: 'models info information performance metrics stats',
                fr: 'modèles info information performance métriques statistiques',
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
          keywords: {
            en: 'data pipeline etl processing workflow',
            fr: 'données pipeline etl traitement flux',
          },
          items: [
            {
              href: '/docs/pipeline/data-collection',
              title: {
                en: 'Data Collection',
                fr: 'Collecte de Données',
              },
              keywords: {
                en: 'collect data source input gather scrape',
                fr: 'collecter données source entrée rassembler extraire',
              },
              items: [],
            },
            {
              href: '/docs/pipeline/preprocessing',
              title: {
                en: 'Data Preprocessing',
                fr: 'Prétraitement',
              },
              keywords: {
                en: 'preprocess clean transform normalize filter',
                fr: 'prétraiter nettoyer transformer normaliser filtrer',
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
                fr: "Méthodologie d'Entraînement",
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
          keywords: {
            en: 'faq help questions answers common issues problems troubleshoot',
            fr: 'faq aide questions réponses problèmes courants dépanner',
          },
          items: [],
        },
        {
          href: '/docs/support/contact',
          title: {
            en: 'Contact',
            fr: 'Contact',
          },
          keywords: {
            en: 'contact support help email reach assistance',
            fr: 'contact support aide email joindre assistance',
          },
          items: [],
        },
      ],
    },
  ],
} as const
