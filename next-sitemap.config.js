/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.greenwaylawyer.com/",
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false, // Set to true if you have many pages
  exclude: ["/admin/*", "/api/*"], // Exclude admin and API routes
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  additionalPaths: async (config) => [
    await config.transform(config, "/"),
    await config.transform(config, "/articles"),
    // Add more static paths as needed
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
    ],
    additionalSitemaps: ["https://fronterainfotech.com/sitemap.xml"],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for different pages
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    if (path.startsWith("/articles")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
