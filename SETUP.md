# Setup Guide

Everything the site needs to go from "looks right" to "fully working."
Work through these in order. Each step says exactly what to click.

---

## 1. Create the Supabase project

Supabase runs the database and login system.

1. Go to **[supabase.com](https://supabase.com)** and sign up (free tier is fine to start).
2. Click **New Project**.
   - Name: `jazmine-marie`
   - Database Password: generate one and **save it somewhere safe** — you can't view it again.
   - Region: pick whichever is closest to most of your members.
3. Wait ~2 minutes for it to finish setting up.

---

## 2. Create the database tables

1. In your Supabase project, click **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Open the file `src/lib/database.sql` from this repo, copy **all** of it.
4. Paste it into the SQL editor and click **Run**.

You should see "Success. No rows returned." That's correct — it created
12 tables and seeded the 3 membership tiers and 10 community rooms.

To confirm: click **Table Editor** in the sidebar. You should see tables
including `profiles`, `tiers`, `rooms`, `memberships`, and `quiz_submissions`.
Click `tiers` — it should show NurturHER, TransformHER, and AscendHER.

---

## 3. Copy your Supabase keys

1. Click the **gear icon (Project Settings)** → **API**.
2. You need three values from this page:

| What to copy | Where it is on the page |
|---|---|
| Project URL | Top of the page, under "Project URL" |
| `anon` `public` key | Under "Project API keys" |
| `service_role` key | Under "Project API keys" — click the eye icon to reveal |

**Important:** the `service_role` key bypasses all security rules. Never put
it in frontend code or share it publicly. It only goes in Vercel's
environment variables (next step), where it stays server-side.

---

## 4. Add the keys to Vercel

1. Go to your project on **[vercel.com](https://vercel.com)**.
2. Click **Settings** → **Environment Variables**.
3. Add each of these (click **Add** after each one):

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Project URL from step 3 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your `anon` key from step 3 |
| `SUPABASE_SERVICE_ROLE_KEY` | Your `service_role` key from step 3 |
| `NEXT_PUBLIC_SITE_URL` | Your live site URL, e.g. `https://jazminemarie.com` |

4. Make sure each is applied to **Production**, **Preview**, and **Development**.
5. Go to the **Deployments** tab and click **Redeploy** on the latest deployment
   so it picks up the new variables.

After this redeploy: the contact form, speaking inquiry form, newsletter
signup, and quiz submissions all start saving to the database. Email/password
signup and login also start working.

---

## 5. Turn on Google login

1. **In Google Cloud Console** ([console.cloud.google.com](https://console.cloud.google.com)):
   - Create a project (or pick an existing one).
   - Go to **APIs & Services** → **OAuth consent screen**. Choose **External**,
     fill in the app name (`OvercomeHER`), your support email, and save.
   - Go to **APIs & Services** → **Credentials** → **Create Credentials**
     → **OAuth client ID**.
   - Application type: **Web application**.
   - Under **Authorized redirect URIs**, add this exact URL:
     ```
     https://<your-project-ref>.supabase.co/auth/v1/callback
     ```
     Replace `<your-project-ref>` with the part of your Supabase Project URL
     before `.supabase.co`.
   - Click **Create**. Copy the **Client ID** and **Client Secret**.

2. **In Supabase**:
   - Go to **Authentication** → **Providers** → **Google**.
   - Toggle it **on**.
   - Paste in the Client ID and Client Secret.
   - Click **Save**.

3. **Also in Supabase**, go to **Authentication** → **URL Configuration**:
   - **Site URL**: your live site, e.g. `https://jazminemarie.com`
   - **Redirect URLs**: add `https://jazminemarie.com/api/auth/callback`

The "Continue with Google" button on `/login` now works.

> Facebook login follows the same pattern via **Authentication → Providers →
> Facebook**, using credentials from developers.facebook.com. It's optional —
> if you leave it off, remove the Facebook button from `src/app/login/login-form.tsx`
> so people aren't shown a button that can't work.

---

## 6. Connect Stripe to memberships

The three membership products and their payment links are already created in
your Stripe account, and the Join page buttons point at them. The remaining
piece is the **webhook** — that's what tells the site "this person paid, give
them access."

1. Go to **[dashboard.stripe.com](https://dashboard.stripe.com)** → **Developers**
   → **Webhooks** → **Add endpoint**.
2. **Endpoint URL**: `https://jazminemarie.com/api/webhooks/stripe`
3. Under **Select events**, add these three:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Click **Add endpoint**, then copy the **Signing secret** (starts with `whsec_`).
5. Back in Vercel → Settings → Environment Variables, add:

| Name | Value |
|---|---|
| `STRIPE_SECRET_KEY` | From Stripe → Developers → API keys → Secret key |
| `STRIPE_WEBHOOK_SECRET` | The `whsec_...` signing secret you just copied |

6. Redeploy again.

---

## 7. Point your domain at the site

1. In Vercel → your project → **Settings** → **Domains**.
2. Type `jazminemarie.com` and click **Add**.
3. Vercel shows you DNS records to add. Go to wherever you bought the domain
   (GoDaddy, Namecheap, Squarespace, etc.) and add those records.
4. DNS can take anywhere from a few minutes to a few hours to take effect.

---

## How to check it's all working

Once steps 1–6 are done, test each one on the live site:

- [ ] **Contact form** — submit it, then check Supabase → Table Editor →
      `contact_messages` for the row.
- [ ] **Speaking inquiry** — submit it, check `speaking_inquiries`.
- [ ] **Newsletter** (footer) — enter an email, check `newsletter_subscribers`.
- [ ] **Healing Style Quiz** — take it through to the results page, check
      `quiz_submissions`.
- [ ] **Sign up with email** — create an account, then check the `profiles`
      table for a matching row.
- [ ] **Continue with Google** — should redirect to Google and back, logged in.
- [ ] **Protected route** — sign out, then visit `/community`. It should bounce
      you to `/login`.
- [ ] **Stripe** — use Stripe's test card `4242 4242 4242 4242` (any future
      expiry, any CVC) to run a test purchase, then check `memberships`.

---

## If something isn't working

**Forms submit but nothing appears in Supabase.**
The env vars probably aren't live yet. Confirm all three Supabase variables are
in Vercel, then redeploy. The forms are built to fail quietly rather than show
an error, so a missing key looks like "nothing happened."

**Google login gives "redirect_uri_mismatch".**
The redirect URI in Google Cloud Console has to match Supabase's callback URL
character for character, including `https://` and the trailing `/auth/v1/callback`.

**Stripe payment goes through but the person has no access.**
Check Stripe → Developers → Webhooks → click your endpoint → look at recent
deliveries for failures. A 401 means `STRIPE_WEBHOOK_SECRET` is wrong or missing.

**`/community` shows demo content instead of real posts.**
Expected until people actually start posting. The rooms and tiers are seeded,
but posts and comments are created by members using the site.
