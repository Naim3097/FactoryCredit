# Factory Credit Landing Page — SEO & Technical Audit Documentation

## Applied Optimizations

### 1. Site Speed & Performance
- **Image optimization**: All images use Next.js `<Image>` component with automatic WebP conversion, lazy loading (except hero which uses `priority`), and proper `sizes` attributes
- **Font optimization**: Brandon Grotesque loaded via `next/font/local` — self-hosted, no external network requests, `font-display: swap` for no layout shift
- **Minimal HTTP requests**: Single-page architecture with code-split components
- **CSS**: Tailwind CSS with tree-shaking — only used classes ship to production

### 2. Mobile Optimization
- Fully responsive design using Tailwind CSS breakpoints (`sm`, `md`, `lg`)
- Mobile-friendly hamburger nav with accessible toggle
- Touch-friendly form inputs and buttons (minimum 44px tap targets)
- No Flash, no intrusive pop-ups or interstitials

### 3. Crawlability
- **Sitemap**: Auto-generated via `src/app/sitemap.ts` → `/sitemap.xml`
- **Robots.txt**: Auto-generated via `src/app/robots.ts` → `/robots.txt` with sitemap reference
- Clean URL structure (single-page, no query parameters)
- No broken internal links

### 4. HTTPS & Security
- Form uses `onSubmit` with `e.preventDefault()` — no raw data sent to URL params
- No inline scripts exposing sensitive data
- Schema markup uses structured JSON-LD (no XSS risk)
- All external links should use `rel="noopener noreferrer"` when added

### 5. Mobile-First Indexing
- Same content on mobile and desktop — responsive layout, no content hiding
- All images render on mobile with appropriate sizes
- Interactive loan calculator fully functional on mobile

### 6. Schema Markup (Structured Data)
Implemented `FinancialService` schema in `layout.tsx` including:
- Business name, description, and URLs
- 4 branch addresses with full PostalAddress schema
- Opening hours specification (Mon-Fri 8am-5pm, Sat 8am-1pm)
- Phone numbers for all branches
- Currency (MYR) and area served (Sarawak, Malaysia)

### 7. Canonicalization
- Single-page site — no duplicate content risk
- Preferred domain should be set via hosting (301 redirect www → non-www or vice versa)

### 8. 404 Error Page
- Custom `not-found.tsx` with:
  - Helpful Malay-language message
  - Clear navigation back to homepage
  - Consistent branding

### 9. HTML Markup & Semantics
- **Heading hierarchy**: Proper H1 → H2 → H3 structure per section
- **Semantic elements**: `<nav>`, `<section>`, `<article>`, `<footer>`, `<main>` used appropriately
- **Image ALT attributes**: All images have descriptive Malay alt text
- **ARIA labels**: Navigation, sections, interactive elements all labeled
- **Title tag**: "Factory Credit - Pinjaman Peribadi Patuh Syariah"
- **Meta description**: Comprehensive, includes key terms and locations

### 10. Mobile Page Speed
- Hero image loaded with `priority` (LCP optimization)
- All other images use native lazy loading
- No render-blocking external resources
- Fonts preloaded via Next.js font system

### 11. Website Structure
- Logical section flow: Hero → Challenges → Problems → WhyChooseUs → Calculator → InfoPenting → Testimonials → Footer
- Smooth scroll navigation with anchor links
- Fixed header for persistent navigation access

### 12. XML Sitemap
- Generated at build time via `src/app/sitemap.ts`
- Includes `lastModified`, `changeFrequency`, and `priority`
- Referenced in robots.txt

### 13. Structured Data Enhancement
- Rich snippet opportunities via FinancialService schema
- Review/testimonial data can be enhanced with `Review` schema when star ratings are formalized
- FAQ schema can be added to Challenges section if needed

---

## Items Requiring Manual Action (Post-Deployment)

| Item | Action Required |
|------|----------------|
| **Preferred Domain** | Configure 301 redirect (www ↔ non-www) at hosting/DNS level |
| **SSL Certificate** | Verify valid SSL after deployment; configure HSTS headers |
| **Hreflang** | Not needed — single language (Malay) site targeting Malaysia |
| **Analytics** | Add Google Analytics 4 / Google Tag Manager |
| **Google Search Console** | Submit sitemap, verify property |
| **Canonical URLs** | Already handled by default in Next.js; verify after deployment |
| **OG Image** | Add a custom `opengraph-image.png` in `src/app/` for social sharing |
| **Favicon** | Add `favicon.ico` and `apple-icon.png` to `src/app/` |

---

## File Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind + custom theme
│   ├── layout.tsx           # Root layout with fonts, metadata, schema
│   ├── page.tsx             # Main page composing all sections
│   ├── not-found.tsx        # Custom 404
│   ├── sitemap.ts           # Auto-generated sitemap
│   └── robots.ts            # Auto-generated robots.txt
├── components/
│   ├── Navbar.tsx           # Fixed nav with mobile menu
│   ├── Hero.tsx             # Hero with bg image + loan application form
│   ├── Challenges.tsx       # "Kenapa bimbang" section
│   ├── Problems.tsx         # "Masalah ini?" cards
│   ├── WhyChooseUs.tsx      # 5 reasons with icons
│   ├── LoanCalculator.tsx   # Interactive calculator with sliders
│   ├── InfoPenting.tsx      # Flexible payment info
│   ├── Testimonials.tsx     # 3 customer reviews
│   └── Footer.tsx           # Full footer with branches
public/
├── fonts/                   # Brandon Grotesque (self-hosted)
└── images/                  # Optimized section images
```
