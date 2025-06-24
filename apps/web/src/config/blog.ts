import type { BlogConfig } from '../lib/opendocs/types/blog'

export const blogConfig: BlogConfig = {
  mainNav: [
    {
      href: '/blog',

      title: {
        en: 'Blog',
      },
    },
  ],

  authors: [
    {
      /* the id property must be the same as author_id in the blog post mdx files required for the computed field
        in contentlayer.config.ts so we can get the author details from the blogConfig by comparing the author_id
        with the id below
      */
      id: 'elm19',
      name: 'elm19',
      image: '/authors/dummy.jpg',
      site: '/',
      email: 'elm19@gmail.com',

      bio: {
        en: 'AI and Data Science Engineering Student',
        fr: 'Étudiant en ingénierie IA et Data Science',
      },

      social: {
        github: 'elm19',
        twitter: '@elm19',
        youtube: 'elm19',
        linkedin: 'elm19',
      },
    },
  ],

  rss: [
    {
      type: 'xml',
      file: 'blog.xml',
      contentType: 'application/xml',
    },

    {
      type: 'json',
      file: 'blog.json',
      contentType: 'application/json',
    },
  ],
} as const
