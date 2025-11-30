# Bob the Stickman Games — Full Stack (Node + Stripe) demo

This repository contains a simple full-stack project implementing:
- user accounts (username/email), JWT auth
- admin panel and admin actions (via admin passcode)
- game submission with thumbnail upload (pending -> approved workflow)
- ratings (free 1 vote, pro 5 votes per game)
- secret chat for Pro users
- Stripe Checkout integration (test mode) to upgrade a user to Pro
- simple SQLite DB (no external DB required)

## Quick local run (development)

1. Clone repo.
2. Server:
   - `cd server`
   - `cp .env.example .env` and edit `.env`:
     - set `JWT_SECRET`, `ADMIN_PASSCODE`, `BASE_URL` (e.g., http://localhost:4000)
     - set `STRIPE_SECRET_KEY` with your Stripe test secret (sk_test_...)
     - optionally set `STRIPE_WEBHOOK_SECRET` (see below)
   - `npm install`
   - `npm start`
3. Client:
   - Open `client/index.html` in the browser OR visit `http://localhost:4000/` (server serves client statically).

## Stripe setup (test mode)

1. Create a Stripe account and get test secret key.
2. Set `STRIPE_SECRET_KEY` in server `.env`.
3. OPTIONAL: create a webhook endpoint in Stripe dashboard:
   - URL: `https://<your-deploy>/webhook`
   - Event: `checkout.session.completed`
   - Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET` in `.env`.
4. The server marks the user as `isPro = 1` when checkout.session.completed is received.

## Deploy to Render (recommended)
1. Create a free Render account.
2. Create a new Web Service from your GitHub repo — point to `server` folder.
3. Set environment variables in Render (from `.env.example`): `JWT_SECRET`, `ADMIN_PASSCODE`, `BASE_URL` (use the Render URL), `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `PRO_PRICE_CENTS`.
4. Deploy. After deploy you will have a public URL.
5. In Stripe, configure a webhook to point to `https://<your-render-url>/webhook` and add `STRIPE_WEBHOOK_SECRET` in Render environment.

## Notes & security
- This demo uses username-only login for simplicity (no passwords). For production, implement robust authentication (email/password, OAuth).
- For production with file persistence, use S3 or Render persistent disks.
- Use HTTPS in production.
