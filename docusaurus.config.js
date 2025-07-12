// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ScrapeUncle',
  tagline: 'Responsible Recycling Made Rewarding',
  favicon: 'img/favicon.ico',

  url: 'https://scrapuncle.com',
  baseUrl: '/docs/',
  trailingSlash: false,

  organizationName: 'scrapuncle',
  projectName: 'docs',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/scrapuncle/docs/edit/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'ScrapeUncle',
      logo: {
        alt: 'ScrapeUncle Logo',
        src: 'img/image.png',
      },
      items: [
        { type: 'docSidebar', sidebarId: 'scrapeuncleSidebar', position: 'left', label: 'Docs' },
        { href: 'https://scrapuncle.com', label: 'Website', position: 'right' },
        { href: 'https://github.com/scrapuncle', label: 'GitHub', position: 'right' },
      ],
    },
    
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Platform',
          items: [
            { label: 'How It Works', to: '/docs/intro' },
            { label: 'Recycling Guide', to: '/docs/guides/recycling-guide' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Website', href: 'https://scrapuncle.com' },
            { label: 'GitHub', href: 'https://github.com/scrapuncle' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ScrapeUncle. Making recycling rewarding.`,
    },
  },
};

export default config;
