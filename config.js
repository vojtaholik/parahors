export default {
  defaultTitle: 'Parahors',
  description: 'Illustration boutique from Czech Republic.',
  author: 'Parahors',
  email: 'nik.dobes@seznam.cz',
  siteUrl: 'parahors.vercel.app',
  favicon: '/favicon.ico',
  titleTemplate: '%s | Parahors',
  additionalMetaTags: [
    { property: 'author', content: 'Parahors' },
    {
      property: 'keywords',
      content:
        'illustration, illustrators, parahors, parahorse, czech republic, cz, brno, street art',
    },
  ],
  twitter: {
    cardType: 'summary_large_image',
  },
  openGraph: {
    title: 'Parahors',
    description: 'Illustration boutique from Czech Republic.',
    type: 'website',
    site_name: 'Parahors',
    profile: {
      firstName: 'Para',
      lastName: 'Hors',
    },
    images: [
      {
        url: 'https://parahors.vercel.app/og-image@2x.png',
        width: 1200,
        height: 728,
      },
    ],
  },
}
