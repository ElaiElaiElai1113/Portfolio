import { useEffect } from 'react';

interface SitemapUrl {
  url: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const staticUrls: SitemapUrl[] = [
  { url: '', priority: 1.0, changefreq: 'weekly' },
  { url: '/projects', priority: 0.9, changefreq: 'weekly' },
  { url: '/experience', priority: 0.8, changefreq: 'monthly' },
  { url: '/certifications', priority: 0.7, changefreq: 'monthly' },
  { url: '/contact', priority: 0.6, changefreq: 'yearly' },
];

const baseUrl = 'https://portfolio.vercel.app';

export function Sitemap() {
  useEffect(() => {
    // This component is only used during build time
    // The actual sitemap generation happens via Vite plugin or build script
  }, []);

  return null;
}

// Function to generate sitemap XML - can be used in a build script
export function generateSitemapXML(dynamicUrls: SitemapUrl[] = []): string {
  const allUrls = [...staticUrls, ...dynamicUrls];

  const urlElements = allUrls
    .map(
      ({ url, changefreq, priority }) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
    ${priority ? `<priority>${priority}</priority>` : ''}
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

// Export for use in build scripts
export { staticUrls, baseUrl };
