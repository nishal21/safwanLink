# Safwan M P – Fitness Influencer Platform

A next-generation web platform for Safwan M P, fitness influencer and trainer. Built for performance, security, and a world-class user/admin experience.

---

## 🚀 Features

- **Linktree-Style Public Page**: Modern, mobile-first showcase for Safwan's brand, socials, and content.
- **Premium Content & Payments**: Sell digital content globally with Stripe (INR, USD, EUR, GBP supported).
- **Admin Dashboard**: Secure, sidebar-based dashboard for content management, file uploads, and analytics.
- **Supabase Integration**: Auth, database, and storage with Row Level Security.
- **Dynamic Previews**: Auto image/link previews using Open Graph.
- **Glassmorphism UI**: Sleek, dark, and professional design with Tailwind CSS.
- **Mobile & Desktop Ready**: Fully responsive, fast, and accessible.
- **Easy Customization**: Update profile, branding, and content in minutes.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js (App Router, TypeScript), Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **Payments**: Stripe Checkout (multi-currency)
- **Previews**: Open Graph API

---

## ⚡ Getting Started

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd safwan
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environment variables**
   - Copy `.env.example` to `.env.local` and fill in your Supabase and Stripe keys.
4. **Run the development server**
   ```bash
   npm run dev
   ```
5. **Access the app**
   - Public: `http://localhost:3000/content`
   - Admin: `http://localhost:3000/admin/dashboard`

---

## 🔑 Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` – Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – Supabase anon key
- `STRIPE_SECRET_KEY` – Stripe secret key
- `NEXT_PUBLIC_BASE_URL` – Your site base URL

---

## 🗄️ Supabase Setup

- **Table**: `content` (id, title, description, price, currency, file_url, link, type, created_at)
- **Storage**: `content-files` bucket
- **Policies**: Secure RLS for all data

---

## 💸 Stripe Setup

- Enable Checkout in Stripe dashboard
- Add supported currencies (INR, USD, EUR, GBP)
- (Optional) Set webhook for payment success

---

## 🎨 Customization

- **Profile & Socials**: Edit in `src/app/content/page.tsx`
- **Branding**: Favicon and theme in `src/app/layout.tsx`

---


## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

**Created by Nishal K (Demonking.___) for Safwan M P**
