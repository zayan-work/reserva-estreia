# Deployment · Estreia (existing) + Meridiano (new)

Both sites deploy from **one repository**, `zayan-work/reserva-estreia`, as **two
independent Vercel projects**. Separate domains, separate environment variables,
separate build logs, separate blast radius. A broken Meridiano deploy cannot
touch Estreia.

The repository did not change identity in the merge, so the Vercel project you
already have keeps its history, its domain and its environment variables. It
needs one setting changed.

---

## 0. The one thing that will break if you do it in the wrong order

Estreia used to live at the repository root. It now lives at `apps/estreia`.
Vercel still expects a Next.js app at the root, so **the next push will fail the
build until the Root Directory setting is changed**.

Production stays up either way (Vercel keeps serving the last good deployment
when a build fails), but do it in this order and nothing goes red:

1. Change the Root Directory setting on the existing project **first**
2. Then push the restructure

Changing the setting alone triggers nothing, so there is no window where the
setting and the code disagree.

---

## 1. Existing Estreia project · what to change

**Settings > General > Root Directory**

| Setting | Was | Set to |
|---|---|---|
| Root Directory | `.` (empty) | `apps/estreia` |
| Include files outside the Root Directory | off | **on** |

That second toggle is not optional. `pnpm-workspace.yaml`, `pnpm-lock.yaml` and
`packages/*` all live above `apps/estreia`, and the app now depends on
`@meridiano/tsconfig` and `@meridiano/eslint-config`. Without it the install
resolves nothing and the build fails.

**Settings > General > Build & Development**

Leave Framework Preset, Build Command and Output Directory on their defaults.
Vercel detects the pnpm workspace from the repository root and runs the install
there. `packageManager` is pinned to `pnpm@11.5.1` in the root `package.json`,
so Corepack picks the right pnpm automatically.

`next.config.ts` already sets `outputFileTracingRoot` to the workspace root,
which is what lets Next trace files from `packages/*` into the build output.
Without it the deploy builds but fails at runtime with missing modules.

**Environment variables** carry over untouched. Verify these are set for
Production, because Estreia's behaviour depends on them:

| Variable | Why it matters on Vercel |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical, sitemap, Open Graph. A bare host is accepted and normalised to `https://`. |
| `PAINEL_USER` / `PAINEL_PASSWORD` | Basic Auth on `/painel` and `/api/stats`. If unset, the code falls back to `estreia` / `trocar-esta-senha`, which is a public dashboard. Check this one. |
| `RESERVATIONS_WEBHOOK_URL` | **Required.** Vercel's filesystem is ephemeral, so the JSON store does not survive. Every reservation must mirror to the Sheet / CRM endpoint or it is lost. |
| `DECISION_THRESHOLD` | optional, dashboard only |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | optional, analytics |

Do **not** set `DATA_DIR` to a path you expect to persist. On Vercel it can only
be `/tmp`, which is wiped between invocations.

**Domain**: unchanged. Nothing to do.

---

## 2. New Meridiano project

**Add New > Project**, import the **same** repository. Vercel allows many
projects from one repo; this is the intended pattern.

| Setting | Value |
|---|---|
| Project Name | `meridiano` |
| Root Directory | `apps/meridiano` |
| Include files outside the Root Directory | **on** |
| Framework Preset | Next.js (auto-detected) |
| Build / Install / Output | defaults |

**Environment variables** (Production):

```
NEXT_PUBLIC_SITE_URL = https://meridianocasa.com
CONTACT_WEBHOOK_URL  = <the Zapier / Make / Apps Script endpoint>
```

That is the whole list. No analytics keys, by design: the handoff bans Google
Analytics, Meta Pixel and third-party trackers at launch.

If `CONTACT_WEBHOOK_URL` is unset the contact form still returns success and
logs the message to the Vercel function log rather than losing it, so you can
stage and review before the mailbox exists. It must be set before launch or real
enquiries will only ever reach the log.

**Deployment Protection**: turn on **Vercel Authentication** for this project,
at least until launch. Preview URLs are public by default, and the handoff is
explicit that the staging link is not to be shared before approval.

---

## 3. Domain and DNS for meridianocasa.com

1. Register `meridianocasa.com`
2. Vercel project > Settings > Domains > add `meridianocasa.com` and `www.meridianocasa.com`
3. Set `www` to redirect to the apex (Vercel offers this when you add both)
4. Point DNS at the records **Vercel shows you on that screen**. Either delegate
   the nameservers to Vercel, or add the apex A record and the `www` CNAME at
   your registrar. Use the values in the panel rather than any written down
   elsewhere; they change.
5. SSL issues automatically once DNS resolves. No configuration.

**Email is separate.** Vercel does not provide mailboxes. `hello@meridianocasa.com`
and `reuban@meridianocasa.com` need a mail provider (Google Workspace, Zoho,
Fastmail) and its **MX records added wherever the DNS lives**. If you delegate
nameservers to Vercel, add the MX records in Vercel's DNS panel. Adding MX does
not affect the website.

Both addresses are already printed on the live site, so provision them before
launch or the contact section points at nothing.

---

## 4. Stop each push rebuilding both sites

By default every push builds both projects. Set an **Ignored Build Step** on
each (Settings > Git). Vercel skips the build when the command exits `0` and
builds when it exits non-zero.

Estreia project:

```bash
git diff --quiet HEAD^ HEAD -- . ../../packages ../../pnpm-lock.yaml ../../package.json
```

Meridiano project: identical, since the command runs from that project's own
Root Directory and `.` resolves to it.

Each project then builds only when its own app, the shared packages, or the
lockfile changed. If the command errors (a shallow clone with no `HEAD^`, for
example) it exits non-zero and the build runs, which is the safe direction.

---

## 5. Order of operations

1. Set Estreia's Root Directory to `apps/estreia` and enable the outside-files toggle
2. Commit and push the restructure
3. Watch the Estreia deploy. **Verify the live site and `/painel` before going further.**
4. Create the Meridiano project, Root Directory `apps/meridiano`, protection on
5. Add its two environment variables
6. Register the domain, add it to the project, point DNS
7. Provision `hello@` and `reuban@`, add MX records
8. Create the contact webhook, set `CONTACT_WEBHOOK_URL`, send a test message
9. Add the Ignored Build Step to both projects
10. Send Rengan the protected preview URL. On approval, promote to production.

---

## 6. Rollback

**If the Estreia re-point goes wrong**: set Root Directory back to `.` and
promote the last known-good deployment from the Deployments tab. Production is
never down during this, because a failed build never replaces a working one.

**If the restructure itself needs undoing**: the commit before the move is a
single `git revert` away, and every Estreia file is byte-identical to it apart
from four config files.

---

## 7. Notes and known risks

**Build depends on Google Fonts.** `next/font/google` downloads Cormorant
Garamond and Montserrat at build time. Vercel's builders reach
`fonts.gstatic.com` fine, so this is not a problem there. It does mean a build
machine without that access fails. If you want the build hermetic, vendor the
four `.woff2` files into the repo and switch `lib/fonts.ts` to
`next/font/local`. Roughly a ten minute change, worth doing before this is
handed to anyone else to build.

**Estreia's data path.** Worth repeating because it is the one silent failure
mode: on Vercel the file store is ephemeral. `RESERVATIONS_WEBHOOK_URL` is the
only durable record of a reservation.

**The two sites must not link to each other.** Separate projects and separate
domains keep that true by construction. Nothing in either build references the
other.

**Repository name.** The repo is still called `reserva-estreia` while now
holding both properties. Renaming it on GitHub is safe (Vercel tracks
repositories by ID, not name) but it is cosmetic. Do it deliberately or not at
all.
