const siteUrl = 'https://blog-agaxe.vercel.app';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
    policies: [
      {
        userAgent: '*',
        disallow: ['/pages*/', '/tags*/']
      }
    ]
  }
};
