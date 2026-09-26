# Echo Moments — Photography Portfolio & Community (Static MVP)

A fully static site (plain HTML/CSS/JS, zero backend, zero build step) — your photography
portfolio plus a curated "Community" page featuring hobbyist photographers with links out
to their own work. No accounts, no database, nothing that can break in production.

**Hosting:** GitHub → Cloudflare Pages (auto-deploys on every push).

---

## How the Community page works (no backend needed)

Instead of open self-registration, `community.html` reads from a plain JavaScript array in
`js/community-data.js`. To feature someone new:

1. Open `js/community-data.js`
2. Copy one of the existing entries and edit the fields:
```javascript
{
  name: "Their Name",
  hobby: "What they shoot",
  bio: "One or two sentences about them or their style.",
  link: "https://instagram.com/theirhandle",   // or portfolio/Drive link
  linkLabel: "@theirhandle",
  palette: 5,   // pick any number 0-7 for a placeholder cover color
},
```
3. Commit and push — Cloudflare redeploys automatically.

People request to be featured via the WhatsApp / Instagram buttons already on the page
(both point to your numbers — `9764500096` and `@prashantmphotography`), so there's no
form to manage or spam to filter.

## Using your own photos instead of placeholder colors

Both the homepage "My Work" section and community cards currently use colored gradient
placeholders. To use a real photo instead:

- **Homepage:** in `index.html`, replace a `<div class="thumb"></div>` with
  `<div class="thumb" style="background-image:url('assets/your-photo.jpg');background-size:cover;background-position:center;"></div>`
- **Community card:** in `js/community-data.js`, add `image: "assets/their-photo.jpg"` (or any
  public image URL) to that person's entry — the code already prefers `image` over the placeholder
  color when present.

Create an `assets/` folder in the project root and drop image files there, then reference them
as `assets/filename.jpg`.

## Test locally

```bash
cd echomoments-site
python3 -m http.server 8000
```
Open `http://localhost:8000`.

## Deploy — GitHub → Cloudflare Pages

```bash
cd echomoments-site
git init
git add .
git commit -m "Echo Moments static MVP"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/echomoments-site.git
git push -u origin main
```

Then in the Cloudflare dashboard:
1. **Workers & Pages → Create → Pages → Connect to Git**
2. Select your `echomoments-site` repo
3. Build command: leave **blank**. Build output directory: `/`
4. **Save and Deploy**
5. Once deployed, go to your Pages project → **Custom Domains** → add `echomoments.in`. Since your
   nameservers already point to Cloudflare, this connects immediately.

Every future `git push` auto-redeploys — including edits to `community-data.js` when you feature
someone new.

## File structure

```
echomoments-site/
├── index.html              # Homepage — your portfolio showcase
├── community.html          # Static hobbyist directory + "Get Featured" CTA
├── css/style.css            # All styling
├── js/
│   ├── main.js               # Mobile nav toggle only
│   ├── community-data.js      # <-- edit this to add/remove featured photographers
│   └── community.js           # Renders community-data.js into cards
└── README.md
```

---

## Phase 2 — adding accounts, uploads & comments later

When you're ready to let people register, upload their own photos, and comment on each
other's work directly on the site (rather than you curating links manually), the earlier
Supabase-based version of this build covers exactly that: email registration, photo storage,
and a comments system, using the same visual design — it slots in without a redesign. Just ask
and it can be re-added on top of this same site.
