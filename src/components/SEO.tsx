import { useLocation } from 'react-router-dom';
import { SITE_URL, buildCanonicalUrl, buildPageTitle } from '@/lib/site';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

const defaultSEO = {
  title: buildPageTitle(),
  description: 'Independent full-stack developer delivering production web, commerce, rewards, automotive, and business systems for clients.',
  image: '/og-image.png',
  type: 'website' as const,
};

export function SEO({ title, description, image, type, noIndex }: SEOProps) {
  const location = useLocation();
  const fullTitle = title ? buildPageTitle(title) : defaultSEO.title;
  const metaDescription = description || defaultSEO.description;
  const metaImage = image || defaultSEO.image;
  const metaType = type || defaultSEO.type;
  const url = buildCanonicalUrl(location.pathname);
  const imageUrl = metaImage.startsWith('http')
    ? metaImage
    : `${SITE_URL}${metaImage.startsWith('/') ? metaImage : `/${metaImage}`}`;

  return (
    <>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={metaType} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Elijah De Los Santos" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={imageUrl} />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </>
  );
}
