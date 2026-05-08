import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

/* ── Site constants ──────────────────────────────────────────────────────── */
const HOSTNAME  = 'https://nerdwaretechnologies.com';
const BLOGS_API = 'https://nerdware-backend.onrender.com/api/blogs';
const TODAY     = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

/* ── Static routes with SEO priority / changefreq ───────────────────────── */
const STATIC_ROUTES = [
  { loc: '/',          changefreq: 'weekly',  priority: 1.0,  lastmod: TODAY },
  { loc: '/about',     changefreq: 'monthly', priority: 0.8,  lastmod: TODAY },
  { loc: '/services',  changefreq: 'monthly', priority: 0.9,  lastmod: TODAY },
  { loc: '/portfolio', changefreq: 'monthly', priority: 0.8,  lastmod: TODAY },
  { loc: '/blog',      changefreq: 'daily',   priority: 0.9,  lastmod: TODAY },
  { loc: '/contact',   changefreq: 'yearly',  priority: 0.7,  lastmod: TODAY },
];

/* ── Private / auth routes to EXCLUDE from sitemap ──────────────────────── */
const EXCLUDED = new Set(['/login', '/register', '/change-password', '/profile']);

/* ── Helper: fetch all blog slugs with pagination ──────────────────────── */
async function fetchAllBlogRoutes() {
  const routes = [];
  let page = 1;
  const limit = 100;

  try {
    while (true) {
      const res  = await fetch(`${BLOGS_API}?page=${page}&limit=${limit}&status=PUBLISHED`);
      if (!res.ok) throw new Error(`API responded ${res.status}`);

      const json = await res.json();
      const blogs = json?.data?.blogs ?? [];

      if (blogs.length === 0) break;

      for (const blog of blogs) {
        if (!blog.slug) continue;
        routes.push({
          loc:        `/blog/${blog.slug}`,
          changefreq: 'monthly',
          priority:   0.75,
          lastmod:    blog.updatedAt
            ? new Date(blog.updatedAt).toISOString().split('T')[0]
            : (blog.publishedAt
                ? new Date(blog.publishedAt).toISOString().split('T')[0]
                : TODAY),
        });
      }

      const { total, pages } = json?.data?.pagination ?? {};
      if (page >= (pages ?? 1) || blogs.length < limit) break;
      page++;
    }

    console.log(`[sitemap] ✅ Fetched ${routes.length} blog routes`);
  } catch (err) {
    console.warn(`[sitemap] ⚠️  Could not fetch blog routes: ${err.message}`);
    console.warn('[sitemap]    Sitemap will only contain static routes.');
  }

  return routes;
}

/* ── Helper: render a <url> entry ────────────────────────────────────────── */
const urlEntry = ({ loc, changefreq, priority, lastmod }) => `
  <url>
    <loc>${HOSTNAME}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;

/* ── Custom Vite plugin: Dynamic Sitemap ─────────────────────────────────── */
const dynamicSitemapPlugin = () => ({
  name: 'dynamic-sitemap',

  async writeBundle(options) {
    const outDir = options?.dir ?? 'dist';

    // Fetch blog routes at build time
    const blogRoutes = await fetchAllBlogRoutes();
    const allRoutes  = [...STATIC_ROUTES, ...blogRoutes];

    // Build sitemap XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
    http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allRoutes.map(urlEntry).join('')}
</urlset>
`;

    const dest = path.join(outDir, 'sitemap.xml');
    fs.writeFileSync(dest, xml, 'utf8');
    console.log(`[sitemap] 📄 Wrote ${allRoutes.length} URLs → ${dest}`);

    // Also generate robots.txt if not already present
    const robotsDest = path.join(outDir, 'robots.txt');
    if (!fs.existsSync(robotsDest)) {
      const robots = `# Nerdware Technologies — robots.txt
User-agent: *
Allow: /

# Private/auth routes
Disallow: /login
Disallow: /register
Disallow: /change-password
Disallow: /profile
Disallow: /admin/

# Sitemap
Sitemap: ${HOSTNAME}/sitemap.xml
`;
      fs.writeFileSync(robotsDest, robots, 'utf8');
      console.log(`[sitemap] 🤖 Wrote robots.txt → ${robotsDest}`);
    }
  },
});

/* ── Vite config ─────────────────────────────────────────────────────────── */
export default defineConfig({
  server: {
    allowedHosts: [
      'nerdwaretechnologies.com',
      'nerdware-rn8f.onrender.com',
    ],
  },

  plugins: [
    react(),
    dynamicSitemapPlugin(),
  ],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
        // React core + scheduler — keep together to avoid circular dep
        // scheduler is required by react-dom at init time; putting it in
        // 'vendor' creates a vendor→react→vendor cycle at runtime.
        if (id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')) {
          return 'react';
        }
 
        // Router — isolated to break the circular dep
        if (id.includes('node_modules/react-router') ||
            id.includes('node_modules/@remix-run')) {
          return 'router';
        }
 
        // Redux
        if (id.includes('node_modules/redux') ||
            id.includes('node_modules/react-redux') ||
            id.includes('node_modules/@reduxjs')) {
          return 'redux';
        }
 
        // Editor / rich-text (commonly heavy)
        if (id.includes('node_modules/@tiptap') ||
            id.includes('node_modules/quill') ||
            id.includes('node_modules/draft-js') ||
            id.includes('node_modules/slate')) {
          return 'editor';
        }
 
        // UI component libraries
        if (id.includes('node_modules/@mui') ||
            id.includes('node_modules/@headlessui') ||
            id.includes('node_modules/framer-motion') ||
            id.includes('node_modules/lucide-react')) {
          return 'ui';
        }
 
        // Everything else in node_modules
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      },
      },
    },
  },
});