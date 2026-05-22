# CD4 Web App (Next.js + TypeScript + Tailwind)

Dedicated landing website for the CD4 mobile app, built with App Router and a modular real-world folder structure.

## Stack

- Next.js (App Router)
- TypeScript (strict mode)
- Tailwind CSS v4
- Data-driven sections via `src/content/landing.ts`

## Folder Structure

```text
cd4-web-app
├─ public/
│  └─ images/
├─ src/
│  ├─ app/                 # page, layout, SEO files, globals.css
│  ├─ components/
│  │  ├─ landing/          # page sections
│  │  └─ shared/           # reusable UI wrappers
│  ├─ content/             # copy + section data
│  ├─ lib/                 # helpers (links, class merge)
│  └─ types/               # shared TS interfaces
└─ package.json
```

## Run Locally

```bash
npm install
npm run dev
```

## Update App Download Links

Create `.env.local` from `.env.example` and set:

```bash
NEXT_PUBLIC_ANDROID_STORE_URL=https://play.google.com/store/apps/details?id=com.cd4.app
NEXT_PUBLIC_IOS_STORE_URL=https://apps.apple.com/app/idYOUR_APP_ID
NEXT_PUBLIC_APK_URL=https://your-cdn.com/cd4-latest.apk
```

If env links are present, landing buttons automatically switch from `Coming Soon` to `Live`.

## Content Editing

- Main content: `src/content/landing.ts`
- FAQ entries: `src/content/landing.ts`
- Hero text, role blocks, and feature cards are all editable there.

## Detailed Documentation

- Full technical guide: `CD4_PROJECT_DOCUMENTATION.md`
