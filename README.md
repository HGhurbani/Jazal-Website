# Jazal Website

A production-ready bilingual website for **Jazal**, a Saudi exhibitions, conferences, and events management company.

The project includes:
- A modern React + Vite marketing website
- Arabic/English localization with RTL/LTR support
- A lightweight Node.js API for editable content persistence (`data.json`)
- A simple admin panel (`/admin`) for managing content and credentials
- Firebase integration utilities for real-time extensions

## ✨ Key Features

- **Bilingual UI (Arabic & English)** with dynamic language switcher
- **RTL/LTR direction switching** based on selected language
- **Section-based landing page** (Hero, About, Services, Projects, Clients, FAQ, Contact)
- **Admin dashboard** with login flow for content updates
- **Persistent local data layer** via JSON-backed API endpoints
- **SEO support** using `react-helmet`
- **Tailwind CSS** for styling and consistent design system

## 🧱 Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, Radix UI
- **Backend:** Node.js built-in `http` server
- **Data storage (local mode):** `data.json`
- **Cloud integrations:** Firebase (Auth, Firestore, Storage, Analytics)

## 📁 Project Structure

```text
.
├── src/
│   ├── admin/                 # Admin login + dashboard
│   ├── components/            # UI and section components
│   ├── contexts/              # Language and auth contexts
│   ├── lib/                   # Translations, helpers, Firebase services
│   ├── App.jsx                # Main website app
│   └── main.jsx               # Entry point (routes /admin to AdminApp)
├── public/                    # Static files
├── tools/                     # Development/build helper scripts
├── server.js                  # API server + static dist hosting
├── data.json                  # Local persisted content + admin credentials
└── vite.config.js             # Vite config
```

## 🚀 Getting Started

### 1) Prerequisites

- Node.js 18+
- npm 9+

### 2) Install dependencies

```bash
npm install
```

### 3) Start development servers

```bash
npm run dev
```

This command starts:
- Vite dev server (frontend)
- Node API server (`server.js`)

### 4) Build for production

```bash
npm run build
```

### 5) Preview production build

```bash
npm run preview
```

## 🔐 Admin Access

Open:

```text
/admin
```

Default local credentials are defined in `data.json`.

> ⚠️ For production, **change admin credentials immediately** and protect the admin route behind proper authentication.

## 🔌 API Endpoints (Local Server)

Base URL (development): `http://localhost:3001`

- `GET /api/data` – retrieve current persisted content
- `POST /api/translations` – merge translation updates by language
- `POST /api/credentials` – update admin credentials

## 🌍 Localization

Translations are managed in:

- `src/lib/translations.js` (default/fallback translations)
- `data.json` (`customTranslations` overrides)

The app updates `<html lang>` and document direction (`rtl` / `ltr`) automatically.

## 🔥 Firebase Notes

The repository includes Firebase initialization and services under `src/lib/`.

Before deploying to production:
- Move Firebase keys/config to environment variables
- Restrict Firebase rules appropriately
- Review all Firebase setup docs in the root directory

## 🧪 Available Scripts

- `npm run dev` – run API + Vite in development
- `npm run build` – generate production build
- `npm run preview` – preview built app

## 📚 Additional Documentation

The repository includes extra operational docs, such as:
- `FIREBASE_SETUP.md`
- `firebase-rules.md`
- `SEO_OPTIMIZATION.md`
- `TROUBLESHOOTING.md`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## 📄 License

No license file is currently included. Add a license (for example, MIT) if you plan to publish or open-source this project.
