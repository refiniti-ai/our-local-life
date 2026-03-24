# Turfflex – Phase 1 Booking MVP

Americana-inspired turf cleaning booking: instant quote, deposit, calendar, confirmations, admin dashboard, crew notification.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Direct URLs work: `/quote`, `/login`, `/login/admin`, `/my-bookings`, `/booking`, `/admin`.

## Deploy to production (server required)

This app is a **Next.js server app** (not a static site). The quote page, login pages, and all API routes only work when the Node server is running.

- **Run the server:** `npm run build && npm start` (listens on port 3000). Every route is available, including direct visits to `/quote`, `/login`, etc.
- **Firebase Hosting** with only the `out` folder will **not** run the API or server-rendered pages. To use Firebase, run the Next.js server (e.g. on Cloud Run) and point Hosting to it, or use [Firebase App Hosting](https://firebase.google.com/docs/app-hosting) for Next.js.
- **Vercel:** Connect the repo and deploy; Vercel runs the Next server and all routes work.
- **Other:** Any host that runs Node (Railway, Render, Cloud Run, etc.) can run `npm run build && npm start` (or the platform’s equivalent).

## What’s included

- **Landing** (`/`) – Americana style, “Get Instant Quote” CTA
- **Quote** (`/quote`) – Contact + sq ft + property type + add-ons; instant estimate; agreements; “Pay deposit & pick date”
- **Booking** (`/booking`) – Pick date/time from available slots; confirm → saved to API
- **Admin** (`/admin`) – View leads and bookings (in-memory for now)
- **API** – `POST /api/leads`, `GET/POST /api/bookings`, `GET /api/availability`, `POST /api/stripe/create-payment-intent`
- **Notifications** – Customer SMS/email confirmation and crew SMS on booking (when env vars set)

## Pricing logic (Arizona)

- Base: $0.45/sq ft · Min job: $150
- Add-ons: Heavy Odor +$0.10/sq ft, Stain +$0.05/sq ft, Infill Refresh +$0.15/sq ft
- Pet waste not removed: +$50
- Deposit: 50% (configurable in code)

## Environment

Copy `.env.example` to `.env.local` and fill in:

- **Stripe** – For real deposits. Without it, “Pay deposit & pick date” still saves the lead and sends the user to the calendar.
- **Twilio** – For SMS (customer confirmation, crew notification). 24-hour reminder can be added via cron + same helpers.
- **Resend** – For email confirmation.

## Logo

Place `TURFFLEX_ONE_COLOR_LOGO.png` in `public/images/` (or copy from project `images/` folder).

## Future phases

- Stripe Elements on quote page (pay deposit before calendar)
- 24-hour reminder cron (e.g. Vercel Cron or external)
- Persistent DB (replace `lib/store.ts` with Supabase/Postgres)
- Admin: set available days/slots, update job status
- Routing, recurring, map drawing, etc.
