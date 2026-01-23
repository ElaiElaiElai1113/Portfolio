import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

const defaultSEO = {
  title: 'Portfolio | Full-Stack Developer',
  description: 'Full-Stack Developer specializing in React, TypeScript, and Node.js. Building modern web applications with exceptional user experiences.',
  image: '/og-image.png',
  type: 'website' as const,
};

const siteUrl = 'https://portfolio.vercel.app';

export function SEO({ title, description, image, type, noIndex }: SEOProps) {
  const location = useLocation();
  const fullTitle = title ? `${title} | Portfolio` : defaultSEO.title;
  const metaDescription = description || defaultSEO.description;
  const metaImage = image || defaultSEO.image;
  const metaType = type || defaultSEO.type;
  const url = `${siteUrl}${location.pathname}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={metaType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={`${siteUrl}${metaImage}`} />
      <meta property="og:site_name" content="Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={`${siteUrl}${metaImage}`} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
