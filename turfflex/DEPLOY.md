# Deploy to Firebase (go live)

Your app is configured for **full live deployment** with SSR: styles, logins, and APIs work at **https://turfflex-app.web.app**.

## One command to go live

From the project root:

```bash
npm run deploy:live
```

Then **allow public access** (fixes “Your client does not have permission to get URL…” on /quote and /login):

```bash
npm run allow-public-access
```

This runs a one-time `gcloud` command so the Cloud Run function accepts unauthenticated requests. If you don’t have `gcloud` installed, do the same in the [Google Cloud Console](https://console.cloud.google.com/run): open the **ssrturfflexapp** service → **Security** → **Allow unauthenticated invocations**.

## What deploy:live does

1. Build the Next.js app (root)
2. Sync app source into the Firebase functions folder
3. Install dependencies and build inside the functions folder
4. Deploy **Hosting** + **Cloud Functions** to Firebase

## Step by step (optional)

```bash
npm run build:firebase   # build + sync + build in functions
firebase deploy          # deploy to Firebase
```

## First-time / clean build

If you see a build error about `.next` (e.g. readlink), run:

```bash
npm run clean
npm run deploy:live
```

## What’s live

- **Hosting** serves your app via the **ssrturfflexapp** Cloud Function (all routes and APIs).
- **Styles**: Google Fonts + Tailwind (no missing font files).
- **Login**: `/login`, `/login/admin`, `/api/auth/login`, etc. work on the live URL.
- **Quote / booking**: `/quote`, `/booking`, `/api/availability`, `/api/bookings` work on the live URL.

## Preview server (firebase serve) with correct styles

To run a **static** preview so styles and fonts look right (no APIs):

```bash
npm run build:preview
firebase serve --config firebase.preview.json
```

Then open the URL shown (e.g. http://localhost:5000). Quote and login won’t call APIs in this mode; for full behavior use `npm run dev` instead.

## Local development (full app + APIs)

```bash
npm run dev
```

Runs the full app at http://localhost:3000 with styles, login, and APIs.
