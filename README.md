# ModernWeb - AI-Powered Platform

> **The future of content is Human + AI.**  
> An enterprise-grade web application crafted with deep navy aesthetics (`#1A1A2E`), royal purple gradients, solar gold accents (`#FFD700`), glassmorphism cards, interactive AI Studio suites, and a production-ready monetization engine (Google AdSense, Carbon Ads, and Pro Soft Paywall).

---

## 🚀 Key Features

1. **Monetization Engine (AdSense + Alternatives)**
   - **Google AdSense integration** with GDPR consent gating.
   - **Reusable `<AdBanner />` & `<AdSidebar />` components** placed responsively:
     - Sticky header announcement & sponsor banner (desktop)
     - In-article ad unit between **Features** and **Demo** sections
     - Desktop vertical sticky sidebar (300x250 / 300x600) beside the interactive **Demo**
     - Pre-contact banner above the **Contact** form
     - Footer fluid ad unit
   - **Multi-network support**: Google AdSense (primary), Carbon Ads (developer focused), Media.net / Ezoic context blocks, and Pro ad-free tier.
   - Verified `/public/ads.txt` and `/public/robots.txt` included.
   - **GDPR & CCPA Cookie Consent Banner** that delays marketing scripts until consent is given.

2. **AI Studio Integration**
   - **AI Color Intelligence**: 5 harmonic mathematical color systems (Cyber Sovereign, Aurora Synthesis, Solar Flare, Platinum Executive), WCAG AA contrast ratios, and 1-click CSS variable export.
   - **Text-to-Image Lab**: Visual prompt playground with styles (*Photorealistic*, *Cyberpunk 3D*, *Vector Illustration*, *Minimalist Luxury*), aspect ratio switches, seed generator, download card, and clean API hookup structure.
   - **AI Copywriter Engine**: Generates conversion-optimized headlines, subheadlines, value props, and CTAs across 4 distinct tones (*Visionary*, *Enterprise B2B*, *Witty & Tech*, *Ultra Minimal*) with 1-click markdown export.
   - **Soft Paywall**: Automatically triggers the **Upgrade to Pro** modal after 2 free AI Studio interactions.

3. **Production Readiness**
   - **Full TypeScript**: Zero `any` types, strict interfaces (`src/types.ts`).
   - **SEO & Social Graph**: Open Graph meta tags, Twitter card tags, and JSON-LD structured data (`WebSite` & `SoftwareApplication` schemas).
   - **Accessibility (a11y)**: Screen reader announcements (`aria-live`), ARIA roles, skip-to-content anchor, keyboard navigation, and `prefers-reduced-motion` compliance.
   - **Responsive**: Mobile-first design fluidly adapting across 320px to 4K displays.
   - **Contact Form**: Client-side field validation + Formspree / custom API route ready.

4. **Preserved & Enhanced Signature Interactions**
   - **Floating Particles Background**: Interactive HTML5 canvas with gold, teal, and purple particles with proximity connection lines.
   - **Smooth Scroll & Header Shrink**: Header transforms and blurs automatically on scroll.
   - **Interactive Color Demo**: Tactile click counter with animated ripple waves.
   - **Animated Statistics**: Accelerated viewport-triggered counters (2,500+ Enterprise Clients, 99.9% Uptime, 150+ Models).
   - **Konami Code Easter Egg**: Press `↑ ↑ ↓ ↓ ← → ← → B A` anywhere to trigger **AI Rainbow Mode**!

---

## 🛠️ Environment Variables Configuration

Copy `.env.example` to `.env`:

```bash
# Google AdSense Configuration
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-XXXXXXXXXXXXXXXX"
NEXT_PUBLIC_ADSENSE_SLOT_HEADER="1234567890"
NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE="2345678901"
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR="3456789012"

# Vite equivalents for client-side builds
VITE_ADSENSE_CLIENT_ID="ca-pub-XXXXXXXXXXXXXXXX"
VITE_ADSENSE_SLOT_HEADER="1234567890"
VITE_ADSENSE_SLOT_INARTICLE="2345678901"
VITE_ADSENSE_SLOT_SIDEBAR="3456789012"

# Optional Contact Form Endpoint (e.g. Formspree)
VITE_CONTACT_FORM_ENDPOINT="https://formspree.io/f/your_form_id"

# Optional Google Analytics 4 Measurement ID
VITE_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

---

## 💰 Setting Up Google AdSense

### 1. Verification with `ads.txt`
Google requires your publisher ID to be authorized in your site root:
1. Open `/public/ads.txt`.
2. Replace `pub-0000000000000000` with your actual AdSense publisher ID:
   ```text
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
3. After deployment, verify it is publicly accessible at: `https://yourdomain.com/ads.txt`.

### 2. Creating Ad Slots
In your Google AdSense Dashboard:
1. Go to **Ads** > **By ad unit**.
2. Create three responsive Display Ad units:
   - **Header / Top Banner**: Name it `ModernWeb_Header` (Horizontal / Responsive).
   - **In-Article Banner**: Name it `ModernWeb_InArticle` (Responsive).
   - **Sidebar Unit**: Name it `ModernWeb_Sidebar` (Square / Vertical or Responsive).
3. Copy the numeric `data-ad-slot` values into your environment variables.

### 3. Live vs Development Behavior
- In development (when placeholder publisher IDs are used), `<AdBanner />` and `<AdSidebar />` show high-fidelity preview placeholders with real dimension metrics and network toggles so you can inspect layouts without generating invalid impressions.
- Once valid publisher credentials are set in production and the user accepts the GDPR banner, real Google AdSense scripts are injected.

---

## 🚢 Deploying to Vercel

This repository is ready to deploy on **Vercel** with zero configuration:

### Method 1: Vercel Web Dashboard
1. Push your repository to GitHub / GitLab.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your repository.
4. In **Environment Variables**, add:
   - `NEXT_PUBLIC_ADSENSE_CLIENT_ID` (or `VITE_ADSENSE_CLIENT_ID`)
   - `NEXT_PUBLIC_ADSENSE_SLOT_HEADER`
   - `NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE`
   - `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR`
5. Click **Deploy**.

### Method 2: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 🔄 Using in Next.js (App Router Migration)

If you wish to use these components in a **Next.js 14 or 15 (App Router)** project:

### 1. Google AdSense via `next/script`
In `app/layout.tsx`:
```tsx
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="en" className="dark">
      <head>
        {clientId && !clientId.includes('0000000000000000') && (
          <Script
            id="google-adsense"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="bg-[#1A1A2E] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
```

### 2. Rendering `<AdBanner />` in Next.js
Mark `AdBanner.tsx` and `AdSidebar.tsx` as Client Components by adding `'use client';` at the top of the files:
```tsx
'use client';

import { AdBanner } from '@/components/AdBanner';

export default function Page() {
  return (
    <main>
      <AdBanner position="header" slotId={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER} />
    </main>
  );
}
```

---

## 🤖 Connecting a Real AI API (Gemini / OpenAI / Grok)

The AI Studio section has explicit client-side simulated generators and clean extension points for backend API routes:

### 1. Connecting Google Gemini for Image Generation
In `server.ts` or `app/api/generate-image/route.ts`:
```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  const { prompt } = await req.json();

  // Call Gemini Imagen 3 model
  const response = await ai.models.generateImages({
    model: 'imagen-3.0-generate-002',
    prompt,
    config: {
      numberOfImages: 1,
      aspectRatio: '16:9',
      outputMimeType: 'image/jpeg',
    },
  });

  const base64Image = response.generatedImages[0].image.imageBytes;
  return Response.json({ imageUrl: `data:image/jpeg;base64,${base64Image}` });
}
```

### 2. Connecting Gemini 2.5 Flash for Copywriting
```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  const { topic, tone } = await req.json();

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Write a high-converting landing page headline, subheadline, 3 value bullet points, and CTA button in a ${tone} tone for the product: "${topic}". Return in JSON format.`,
    config: {
      responseMimeType: 'application/json',
    },
  });

  return Response.json(JSON.parse(response.text || '{}'));
}
```

---

## 🎮 Easter Egg

Type the legendary **Konami Code** on your keyboard:
```
↑  ↑  ↓  ↓  ←  →  ←  →  B  A
```
This triggers **AI Rainbow Mode**: dynamic hue-shifting across all glowing gradients and 2.5x speed particle flux!
