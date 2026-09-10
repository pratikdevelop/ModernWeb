# ModernWeb - AI-Powered Platform

> **The future of content is Human + AI.**  
> An enterprise-grade web application optimized for **Google AdSense site review approval**, high-RPM monetization, organic search rankings (SEO), and conversion velocity.

---

## 📍 Google AdSense Ad Units: Exact Placements

All 7 ad units are responsive, lazy-loaded via `IntersectionObserver`, and strictly gated behind user cookie consent:

| # | Exact Location | Component ID | Slot Type | Description & Policy Alignment |
|---|----------------|--------------|-----------|--------------------------------|
| **1** | **Sticky top banner (desktop only)** | `#ad-unit-sticky-top` | Horizontal / Sponsor | Pinned to the very top on desktop displays (`md+`). Clean announcement format with dismiss option and Pro upgrade link. |
| **2** | **Between Hero and Features** | `#ad-unit-hero-features` | Responsive In-Feed | Positioned between primary value proposition and feature grid. High viewability without blocking interactive controls. |
| **3** | **Inside AI Studio (after tools)** | `#ad-unit-aistudio-after-tools` | Fluid Banner | Appears directly beneath the active AI tool workbench (Palette AI, Image Lab, Copywriter) before the global CTA. |
| **4** | **Between Demo and Stats** | `#ad-unit-demo-stats` | Responsive Leaderboard | Placed between the kinetic color picker demo and the animated enterprise statistics metrics. |
| **5** | **Desktop Sidebar (right side of AI Studio)** | `#ad-unit-aistudio-sidebar` | 300x250 / 300x600 Vertical | Sticky vertical sidebar pinned alongside the AI Studio workspace on wide screens (`xl+`). |
| **6** | **Above the Contact form** | `#ad-unit-precontact` | In-Article Banner | Positioned before the consultation contact form, capturing engaged bottom-of-funnel traffic. |
| **7** | **Footer banner** | `#ad-unit-footer` | Fluid Leaderboard | Clean, unobtrusive bottom banner situated directly above the footer navigation links and legal text. |

---

## 🚀 Key Improvements & Architecture

### 1. AdSense Approval & Monetization (Better Ads Compliant)
- **Reusable `<AdUnit />` component**: Unified component handling all 7 placements with lazy loading, slot ID fallback, development preview mode, and AdSense script queueing.
- **GDPR & CCPA Consent Guard**: Google AdSense and marketing scripts only load once the user accepts marketing cookies via the non-intrusive cookie consent banner.
- **Clear "Supported by ads" disclosure**: Present on the Free plan, educating users on why advertisements appear and providing a clear path to the ad-free Pro tier.
- **Multi-network testing switcher**: Toggle between Google AdSense, Carbon Ads, and Media.net previews in development mode.
- **Zero intrusive formats**: No auto-playing audio, no full-screen interstitial traps, and no overlapping elements.

### 2. Traffic & SEO Optimization (AdSense Content Depth)
- **High-Value Blog Section** featuring 4 long-form articles with reading modals:
  1. *“How AI is Changing Web Design in 2026”*
  2. *“Best Color Palette Generators for Developers”*
  3. *“How to Monetize AI Tools with Google AdSense”*
  4. *“Human + AI Content Workflow for Startups”*
- **Accordion FAQ Section**: 8 in-depth questions addressing commercial licensing, WCAG accessibility, AdSense policies, and Gemini API integration.
- **Testimonials Section**: 4 verified reviews with photos, roles, and company affiliations.
- **Sitemap & Robots**: Full `/public/sitemap.xml` with priority mappings and `/public/robots.txt` granting access to `Mediapartners-Google`.
- **Enriched Meta & JSON-LD**: Comprehensive Open Graph tags, Twitter card preview, and schema.org structured data.

### 3. High-Converting Lead Magnet & Soft Paywall
- **Email Lead Magnet**: *"Download Free AI Color Palette Pack + 50 Prompt Templates"* with client-side validation and instant `.json` download delivery.
- **Soft Paywall Trigger**: Free plan provides **5 daily uses** with a dynamic *"Free uses remaining: X/5"* status counter. After 5 interactions, users are guided to the Pro upgrade modal.
- **Sticky Mobile CTA Bar**: Sticky bottom bar on mobile screens (*“Try AI Studio Free →”*) for frictionless access.

---

## 🛠️ Environment Variables

Add these to your `.env` file (see `.env.example`):

```bash
# Google AdSense Publisher & Slot IDs
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-0000000000000000"
NEXT_PUBLIC_ADSENSE_SLOT_HEADER="1234567890"
NEXT_PUBLIC_ADSENSE_SLOT_HERO_FEATURES="2345678901"
NEXT_PUBLIC_ADSENSE_SLOT_AISTUDIO_IN="3456789012"
NEXT_PUBLIC_ADSENSE_SLOT_AISTUDIO_SIDEBAR="4567890123"
NEXT_PUBLIC_ADSENSE_SLOT_DEMO_STATS="5678901234"
NEXT_PUBLIC_ADSENSE_SLOT_PRE_CONTACT="6789012345"
NEXT_PUBLIC_ADSENSE_SLOT_FOOTER="7890123456"

# Vite client-side build aliases
VITE_ADSENSE_CLIENT_ID="ca-pub-0000000000000000"
VITE_ADSENSE_SLOT_HEADER="1234567890"
VITE_ADSENSE_SLOT_HERO_FEATURES="2345678901"
VITE_ADSENSE_SLOT_AISTUDIO_IN="3456789012"
VITE_ADSENSE_SLOT_AISTUDIO_SIDEBAR="4567890123"
VITE_ADSENSE_SLOT_DEMO_STATS="5678901234"
VITE_ADSENSE_SLOT_PRE_CONTACT="6789012345"
VITE_ADSENSE_SLOT_FOOTER="7890123456"

# Optional integrations
VITE_CONTACT_FORM_ENDPOINT=""
VITE_GA_MEASUREMENT_ID=""
```
