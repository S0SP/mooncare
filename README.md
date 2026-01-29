# MoonCare - Predictive Menstrual Care Platform

> From Calendar Tracking to Body Intelligence

MoonCare is a women-centric menstrual health platform combining wearable technology, AI prediction, and personalized care kits for women with PCOD/PCOS and irregular cycles.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables (see .env.example)
cp .env.example .env.local

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the website.

## 📦 Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## 📁 Project Structure

```
mooncare/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Homepage
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   ├── how-it-works/     # How It Works page
│   │   ├── kits/             # Care Kits page
│   │   ├── pricing/          # Pricing page
│   │   └── about/            # About page
│   ├── components/
│   │   ├── Header.tsx        # Navigation header
│   │   └── Footer.tsx        # Site footer
│   └── lib/
│       └── supabase.ts       # Supabase client
├── DATABASE_SETUP.md         # Database setup guide
└── .env.example              # Environment template
```

## 🗃️ Database Setup

1. Create a [Supabase](https://supabase.com) project
2. Run the SQL from `DATABASE_SETUP.md` in SQL Editor
3. Copy your API keys to `.env.local`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

## 📱 Pages

- **/** - Homepage with hero, problem/solution, impact stats
- **/how-it-works** - 5-step journey, technology deep dive
- **/kits** - Care kit products with interactive quiz
- **/pricing** - Subscription plans and value calculator
- **/about** - Mission, team, SDG alignment

## ✨ Features

- [x] Responsive design (mobile-first)
- [x] Beautiful animations with Framer Motion
- [x] Interactive kit recommendation quiz
- [x] Value calculator
- [x] Newsletter signup
- [x] SEO optimized

## 🎨 Design System

### Colors
- **Lavender**: `#E8D5F2`, `#D4B5E8`
- **Peach**: `#FFD4C4`, `#FFC4B0`
- **Deep Purple (CTA)**: `#8B5FBF`
- **Coral (Alerts)**: `#FF6B6B`
- **Sage (Success)**: `#A8DADC`

### Typography
- **Headings**: Poppins (600, 700)
- **Body**: Inter (400, 500)

## 📄 License

MIT License - Feel free to use this project!

---

Built with ❤️ for women everywhere.
