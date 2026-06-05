# 🎬 FLow Edits — Video Editor Portfolio

A cinematic, Gen-Z styled portfolio website for a professional video editor.
Built with Next.js 14, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Add your environment variables
cp .env.local.example .env.local
# Then edit .env.local with your Google Sheet ID

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📊 Google Sheets CMS Setup

This site uses a Google Sheet as a free, zero-auth CMS for the portfolio grid.
When you add a row to your sheet, the website updates automatically (every 5 min).

### Step-by-Step

1. **Create a Google Sheet** at [sheets.google.com](https://sheets.google.com)

2. **Set up your columns** (Row 1 = headers, exact names don't matter — just the order):
   | Column A | Column B | Column C | Column D |
   |----------|----------|----------|----------|
   | title | category | thumbnail | videoUrl |

3. **Add your first project** in Row 2:
   ```
   A2: Neon Horizon Brand Film
   B2: Commercial
   C2: https://your-image-host.com/thumbnail.jpg
   D2: https://www.youtube.com/embed/YOUR_VIDEO_ID
   ```

4. **Make it public**: File → Share → Change to "Anyone with the link" → Viewer

5. **Get your Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
                                          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                          This is your SHEET_ID
   ```

6. **Add to `.env.local`**:
   ```
   GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms
   ```

### Supported Categories
- `Commercial` — purple tag
- `Short Film` — blue tag
- `Short Form` — cyan tag
- `Podcast` — orange tag
- `YouTube` — red tag
- `Motion Graphics` — green tag
- Any custom category — white/gray tag

### Video URL Formats
```
YouTube:  https://www.youtube.com/embed/VIDEO_ID
Vimeo:    https://player.vimeo.com/video/VIDEO_ID
```

### Thumbnail Hosting
Use any public image URL:
- Cloudinary (recommended, free)
- ImgBB
- Imgur
- Unsplash (for demos)

---

## 🛠️ Customization

### Personal Info
Edit these files to replace placeholder content:

- **Name / branding**: `components/Navbar.tsx` and `app/layout.tsx`
- **Hero headline**: `components/Hero.tsx`
- **Stats**: `components/Hero.tsx` (the stats row near the bottom)
- **Contact links**: `components/Contact.tsx` — update WhatsApp number, Instagram handle, and email
- **Showreel URL**: `components/Showreel.tsx` — replace the YouTube embed URL
- **Services**: `components/Services.tsx`
- **Testimonials**: `components/Testimonials.tsx`

### Colors
The accent colors (purple + electric blue) are defined in:
- `app/globals.css` — CSS variables
- `tailwind.config.js` — Tailwind theme extension

---

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
vercel

# Set environment variable:
# GOOGLE_SHEET_ID = your_sheet_id
# GOOGLE_SHEET_NAME = Sheet1 (or your tab name)
```

Or push to GitHub and connect to Vercel — it auto-deploys.

**In Vercel Dashboard**: Settings → Environment Variables → Add `GOOGLE_SHEET_ID`

The site uses ISR (Incremental Static Regeneration) with a 5-minute revalidation window.
New rows in your Google Sheet appear on the site within 5 minutes automatically.

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css        # Global styles, animations, utilities
│   ├── layout.tsx         # Root layout with fonts and metadata
│   └── page.tsx           # Main page — fetches data, assembles sections
├── components/
│   ├── Navbar.tsx         # Sticky nav with mobile menu
│   ├── Hero.tsx           # Full-screen cinematic hero
│   ├── ToolsMarquee.tsx   # Scrolling tools/software strip
│   ├── Showreel.tsx       # Featured video showreel section
│   ├── Works.tsx          # Portfolio grid (Google Sheets powered)
│   ├── Services.tsx       # Services cards
│   ├── WhyMe.tsx          # Value proposition section
│   ├── Testimonials.tsx   # Auto-scrolling testimonials
│   └── Contact.tsx        # Contact CTA with social links
├── lib/
│   └── sheets.ts          # Google Sheets data fetching utility
├── .env.local.example     # Environment variables template
└── tailwind.config.js     # Tailwind configuration
```

---

## ⚡ Performance Notes

- Uses Next.js `Image` component for optimized thumbnails
- ISR revalidation at 5-min intervals (configurable in `app/page.tsx`)
- Framer Motion animations only trigger when elements enter viewport
- All animations respect `prefers-reduced-motion` via Framer Motion defaults

---

Built with ❤️ and ☕ | Designed for maximum creative impact
