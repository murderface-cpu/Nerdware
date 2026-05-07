/**
 * SEO.jsx — God-Level SEO Component
 *
 * Handles:
 *  - <title> + all standard meta tags
 *  - Open Graph (og:*) + Twitter cards
 *  - JSON-LD structured data:
 *      • WebSite (with SearchAction sitelinks)  — every page
 *      • Organization                           — every page
 *      • BreadcrumbList                         — every page except home
 *      • Article / BlogPosting                  — blog detail pages
 *      • Service                                — services page
 *  - Canonical URL
 *  - robots directive (index/noindex)
 *
 * Usage (normal page):
 *   <SEO title="About" description="..." url="/about" />
 *
 * Usage (blog post):
 *   <SEO
 *     title={post.title}
 *     description={post.excerpt}
 *     image={post.coverImage}
 *     url={`/blog/${post.slug}`}
 *     type="article"
 *     article={{
 *       publishedAt: post.publishedAt,
 *       updatedAt:   post.updatedAt,
 *       author:      post.author?.name,
 *       tags:        post.tags,
 *       category:    post.category,
 *       readTime:    post.readTime,
 *     }}
 *   />
 */

import { Helmet } from 'react-helmet-async';

/* ── Site-wide constants ──────────────────────────────────────────────────── */
const SITE = {
  name:        'Nerdware Technologies',
  shortName:   'Nerdware',
  url:         'https://nerdwaretechnologies.com',
  logo:        'https://nerdwaretechnologies.com/images/logo.png',
  logoWidth:   200,
  logoHeight:  60,
  description: 'Leading software development and AI automation company in Kenya. Expert web development, mobile apps, and digital solutions.',
  locale:      'en_KE',
  twitterHandle: '@NerdwareTech',       // update if you have one
  facebook:    '',                       // e.g. https://facebook.com/nerdware
  linkedin:    'https://linkedin.com/company/nerdware-technologies',
  github:      '',
  email:       'info@nerdwaretechnologies.com',
  phone:       '',                       // e.g. +254700000000
  address: {
    country:  'KE',
    region:   'Nairobi County',
    locality: 'Nairobi',
  },
};

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const abs = (path) =>
  !path ? null : path.startsWith('http') ? path : `${SITE.url}${path}`;

const buildBreadcrumbs = (url) => {
  if (!url || url === '/') return null;
  const parts = url.replace(/\/$/, '').split('/').filter(Boolean);
  const items = [{ name: 'Home', url: SITE.url }];
  let cumulative = '';
  parts.forEach((part) => {
    cumulative += `/${part}`;
    const name = part
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    items.push({ name, url: `${SITE.url}${cumulative}` });
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       item.name,
      item:       item.url,
    })),
  };
};

/* ── JSON-LD blocks ───────────────────────────────────────────────────────── */

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type':    'WebSite',
  '@id':      `${SITE.url}/#website`,
  url:        SITE.url,
  name:       SITE.name,
  description: SITE.description,
  inLanguage: 'en-KE',
  potentialAction: {
    '@type':        'SearchAction',
    target: {
      '@type':      'EntryPoint',
      urlTemplate:  `${SITE.url}/blog?q={search_term_string}`,
    },
    'query-input':  'required name=search_term_string',
  },
};

const buildOrganizationSchema = () => {
  const sameAs = [
    SITE.facebook,
    SITE.linkedin,
    SITE.github,
  ].filter(Boolean);

  return {
    '@context':   'https://schema.org',
    '@type':      'Organization',
    '@id':        `${SITE.url}/#organization`,
    name:         SITE.name,
    alternateName: SITE.shortName,
    url:          SITE.url,
    logo: {
      '@type':    'ImageObject',
      url:        SITE.logo,
      width:      SITE.logoWidth,
      height:     SITE.logoHeight,
    },
    description:  SITE.description,
    ...(SITE.email && { email: SITE.email }),
    ...(SITE.phone && { telephone: SITE.phone }),
    address: {
      '@type':            'PostalAddress',
      addressCountry:     SITE.address.country,
      addressRegion:      SITE.address.region,
      addressLocality:    SITE.address.locality,
    },
    ...(sameAs.length > 0 && { sameAs }),
  };
};

const buildArticleSchema = ({ pageTitle, description, pageImage, pageUrl, article }) => ({
  '@context':   'https://schema.org',
  '@type':      'BlogPosting',
  '@id':        `${pageUrl}#article`,
  headline:     pageTitle,
  description,
  ...(pageImage && { image: { '@type': 'ImageObject', url: pageImage } }),
  url:          pageUrl,
  datePublished: article.publishedAt,
  dateModified:  article.updatedAt || article.publishedAt,
  inLanguage:   'en-KE',
  author: {
    '@type': 'Person',
    name:    article.author || SITE.name,
  },
  publisher: {
    '@type': 'Organization',
    '@id':   `${SITE.url}/#organization`,
    name:    SITE.name,
    logo: {
      '@type':  'ImageObject',
      url:      SITE.logo,
      width:    SITE.logoWidth,
      height:   SITE.logoHeight,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id':   pageUrl,
  },
  ...(article.tags?.length && { keywords: article.tags.join(', ') }),
  ...(article.category && {
    articleSection: article.category,
    about: { '@type': 'Thing', name: article.category },
  }),
  ...(article.readTime && {
    timeRequired: `PT${article.readTime}M`,
  }),
  isPartOf: {
    '@type': 'Blog',
    '@id':   `${SITE.url}/blog#blog`,
    name:    `${SITE.name} Blog`,
    url:     `${SITE.url}/blog`,
  },
});

/* ── Component ───────────────────────────────────────────────────────────── */

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type    = 'website',
  article = null,      // object with { publishedAt, updatedAt, author, tags, category, readTime }
  noIndex = false,     // set true on /login, /register, /change-password, etc.
}) => {
  const pageTitle  = title ? `${title} | ${SITE.name}` : SITE.name;
  const pageDesc   = description || SITE.description;
  const pageUrl    = url ? abs(url) : SITE.url;
  const pageImage  = image ? abs(image) : SITE.logo;

  const isArticle   = type === 'article' && article;
  const breadcrumbs = buildBreadcrumbs(url);

  const schemas = [
    websiteSchema,
    buildOrganizationSchema(),
    ...(breadcrumbs ? [breadcrumbs] : []),
    ...(isArticle ? [buildArticleSchema({ pageTitle: title, description: pageDesc, pageImage, pageUrl, article })] : []),
  ];

  return (
    <Helmet>
      {/* ── Core ──────────────────────────────────────────────────────── */}
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description"        content={pageDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author"             content={isArticle && article.author ? article.author : SITE.name} />
      <link rel="canonical"           href={pageUrl} />
      <meta name="robots"             content={noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />

      {/* ── Open Graph ────────────────────────────────────────────────── */}
      <meta property="og:type"        content={isArticle ? 'article' : 'website'} />
      <meta property="og:site_name"   content={SITE.name} />
      <meta property="og:locale"      content={SITE.locale} />
      <meta property="og:url"         content={pageUrl} />
      <meta property="og:title"       content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      {pageImage && <meta property="og:image"       content={pageImage} />}
      {pageImage && <meta property="og:image:alt"   content={pageTitle} />}
      {pageImage && <meta property="og:image:width" content="1200" />}
      {pageImage && <meta property="og:image:height" content="630" />}

      {/* ── Article-specific OG ───────────────────────────────────────── */}
      {isArticle && article.publishedAt && (
        <meta property="article:published_time" content={article.publishedAt} />
      )}
      {isArticle && (article.updatedAt || article.publishedAt) && (
        <meta property="article:modified_time" content={article.updatedAt || article.publishedAt} />
      )}
      {isArticle && article.author && (
        <meta property="article:author" content={article.author} />
      )}
      {isArticle && article.category && (
        <meta property="article:section" content={article.category} />
      )}
      {isArticle && article.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* ── Twitter / X ───────────────────────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      {SITE.twitterHandle && <meta name="twitter:site"    content={SITE.twitterHandle} />}
      {SITE.twitterHandle && <meta name="twitter:creator" content={SITE.twitterHandle} />}
      <meta name="twitter:title"       content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      {pageImage && <meta name="twitter:image"   content={pageImage} />}
      {pageImage && <meta name="twitter:image:alt" content={pageTitle} />}

      {/* ── Performance hints ─────────────────────────────────────────── */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://nerdware-backend.onrender.com" />

      {/* ── JSON-LD Structured Data ────────────────────────────────────── */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;