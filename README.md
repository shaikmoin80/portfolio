# Moin Shaik: Portfolio Website

A fast, static portfolio built with plain **HTML, CSS and JavaScript**. There is no build step, no framework and no install. It works when you double-click it and it works on GitHub Pages.

```
portfolio/
├── index.html              page structure + SEO tags (rarely edited)
├── 404.html                "page not found" page
├── css/styles.css          look & feel (colours and fonts at the very top)
├── js/data.js              ★ ALL your content lives here ★
├── js/main.js              draws the page from data.js (rarely edited)
├── assets/
│   ├── profile-placeholder.svg   monogram avatar (used until you add a photo)
│   └── profile.jpg               ← YOU add this (optional)
├── cv/                     ← put your CV PDFs here
├── .nojekyll               tells GitHub Pages to serve files as-is
└── .gitignore
```

---

## 1. Preview it on your computer

**Easiest:** open the `portfolio` folder and double-click **`Run-Portfolio.bat`**. A black window opens and your browser shows the site at <http://localhost:8000/>. Close the window to stop it. Edit `js\private.local.js` once (it is created for you) to show your email and phone locally.

**Manual way:** open PowerShell and run:

```powershell
cd E:\Interview\portfolio
python -m http.server 8000
```

Then visit <http://localhost:8000>. Press `Ctrl + C` in PowerShell to stop it.

After you edit a file, save it and refresh the browser (`Ctrl + F5` forces a full refresh).

> Fonts come from Google Fonts. Offline, the site falls back to your system fonts.

---

## 2. How to change anything

Open the file in any editor (Cursor, VS Code, even Notepad). Keep the quotes and commas exactly as they are. If the page goes blank after an edit, you have probably deleted a comma or a quote; press `F12` in the browser and the Console tells you the line.

| I want to change… | Edit this file | Field / place |
|---|---|---|
| My name | `js/data.js` | `name`, `nickname`, `monogram` |
| The favicon letters (browser tab icon) | `index.html` | the `<link rel="icon" …>` line: change `MS` |
| The small line above your name | `js/data.js` | `kicker` |
| The rotating headline (the two target roles) | `js/data.js` | `headlineRoles` |
| The one-line tagline under the headline | `js/data.js` | `tagline` |
| The summary paragraphs | `js/data.js` | `summary` (one string per paragraph) |
| "Immediate Joiner" badge | `js/data.js` | `availability` (set to `''` to hide) |
| Location / "Open to remote" line | `js/data.js` | `location`, `openTo` |
| Stat counters (years, clouds, etc.) | `js/data.js` | `stats` |
| The role switcher (hidden on purpose) | `js/data.js` | `sections`: the `roles` row, `show: true` to bring it back |
| "How my roles connect" text | `js/data.js` | `connect` |
| Skills | `js/data.js` | `skills` (groups and items). To highlight a skill for a role, put the *same text* in that role's `focus` list |
| Add a job | `js/data.js` | `experience`: copy one whole `{ … },` block, paste it where it belongs (newest first), edit |
| Remove a job | `js/data.js` | `experience`: delete its whole `{ … },` block |
| Add a project / case study | `js/data.js` | `projects`: copy a whole `{ … },` block, give it a **new unique `id`**. To feature it for a role, add the id to that role's `projects` list |
| Highlights / achievements | `js/data.js` | `achievements` |
| Education | `js/data.js` | `education` |
| Colours | `css/styles.css` | the variables at the top (`--accent-1`, `--accent-2`, `--accent-3`, `--bg`, …). Light theme: `[data-theme="light"]` block |
| Fonts | `css/styles.css` and `index.html` | change `--font-body` / `--font-display` at the top of the CSS **and** the Google Fonts `<link>` in `index.html` (pick fonts at fonts.google.com) |
| My photo | `assets/` | add a **square** image named exactly `profile.jpg`, **at least 800 × 800 px**. If it is missing, the monogram shows instead |
| The CV download | private repo `portfolio-private` | Replace `Shaik_Moin_CV_Cloud_Operations_SRE.pdf` in that private repo, then run **Deploy site** in this repo. Nothing in this public repo changes. |
| The CV for local preview | `cv/` (not uploaded) | Copy the full PDF into `cv/` on your PC. `.gitignore` stops it being committed. |
| LinkedIn / GitHub buttons | `js/data.js` | `links.linkedin` and `links.github`: paste the full URL (leave `''` to hide) |
| Phone number / email | GitHub secrets | **Settings → Secrets and variables → Actions**: `SITE_PHONE`, `SITE_EMAIL`, then re-run **Deploy site**. They are not in `data.js` (it only holds placeholders). For local preview, copy `js/private.local.example.js` to `js/private.local.js` and fill it in; that file is never uploaded. |
| Contact section text | `js/data.js` | `contactHeading`, `contactText` |
| Section order / hide a section | `js/data.js` | `sections`: reorder the lines, or set `show: false`. Menu labels are the `nav` fields |
| Page title / search-engine description | `index.html` | `<title>`, `<meta name="description">`, and the `og:` lines |

Tip: when you describe results, keep them honest. Where a number would help, write `[your number]` until you have the real figure.

---

## 3. Publish to GitHub (Windows)

### 3.1 Install Git
Download it from <https://git-scm.com> **or** run in PowerShell:

```powershell
winget install --id Git.Git -e
```

Close and reopen PowerShell afterwards, then tell Git who you are (one time only):

```powershell
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use the same email as your GitHub account (or GitHub's private "noreply" address).

### 3.2 Create the repository on GitHub
1. Sign in at <https://github.com> and click **New repository**.
2. Name it **`portfolio`**, or **`<username>.github.io`** if you want the root URL `https://<username>.github.io/`.
3. Choose **Public**. Leave "Add a README / .gitignore / licence" **unticked** (the repo must be empty). Click **Create repository**.

### 3.3 Push your files
In PowerShell (replace `<username>`):

```powershell
cd E:\Interview\portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<username>/portfolio.git
git push -u origin main
```

If you named the repo `<username>.github.io`, use `https://github.com/<username>/<username>.github.io.git` in the `remote add` line.

**Authentication:** the first `git push` opens a browser window (Git Credential Manager) so you can sign in to GitHub. If it asks for a password in the terminal instead, GitHub no longer accepts account passwords; create a **Personal Access Token** (GitHub → Settings → Developer settings → Personal access tokens → *Generate new token*, tick the `repo` scope) and paste the token as the password.

---

## 4. Turn on GitHub Pages
This site is deployed by a GitHub Action (`.github/workflows/deploy.yml`). It fills in your email and phone from secrets, and copies the full CV from a **private** repository named `portfolio-private`, so the CV is never in this public repo.

**One-time setup for the CV (do this first):**
1. Create a **private** repository named `portfolio-private` on github.com.
2. Put `Shaik_Moin_CV_Cloud_Operations_SRE.pdf` in it at the top level (the exact file name matters).
3. Create a fine-grained token: GitHub → your profile picture → Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token.
   - Token name `portfolio-cv`, Expiration 1 year (put a reminder to renew it).
   - **Repository access** → **Only select repositories** → pick `portfolio-private`.
   - Scroll to **Permissions** → click **Add permissions** → in the **Repository permissions** list (not Account) search for **Contents** and tick it. Its access level shows **Read-only** by default.
   - Click **Generate token** and copy it now. It is shown only once.
4. In `portfolio` (this public repo): Settings → Secrets and variables → Actions → New repository secret. Name `PRIVATE_REPO_TOKEN`, value = the token you copied.

1. **Add the two secrets first.** Repo → **Settings → Secrets and variables → Actions → New repository secret**.
   - Name `SITE_EMAIL`, value: your email.
   - Name `SITE_PHONE`, value: your phone number (for example `+91 00000 00000`).
2. Repo → **Settings → Pages → Build and deployment → Source**: choose **GitHub Actions**. There is no Save button for this choice; it applies immediately.
3. Repo → **Actions** tab → **Deploy site** → **Run workflow**. (It also runs on every push.)
4. When it turns green, the address is shown in the run summary and in **Settings → Pages**:
   `https://<username>.github.io/portfolio/`

To change the email or phone later: update the secret, then run **Deploy site** again. Nothing in the repository changes.

Note: anything the live site shows (phone, email) is visible to every visitor of the site. The secrets only keep it out of the repository files, history and downloads.

After it is live, open `index.html` and add your canonical link and social preview image (see the comment near the top of `<head>`).

---

## 5. Future changes (the 4-command routine)

```powershell
cd E:\Interview\portfolio
git status
git add .
git commit -m "Update projects and CVs"
git push
```

`git status` shows what changed. The site refreshes about 1-2 minutes after each push.

---

## 6. Troubleshooting

| Problem | Fix |
|---|---|
| **404 on the live site** | Check **Settings → Pages** is set to *main / root*. The repo must be public (on free plans). `index.html` must be in the repo root, not inside another folder. Wait 2 minutes. |
| **Site shows plain text, no styling, but works locally** | GitHub Pages is **case-sensitive**: `css/styles.css` ≠ `CSS/Styles.css`. Make file names and the paths in `index.html` match exactly (all lowercase here). Same for `assets/profile.jpg` vs `Profile.JPG`. |
| **Photo does not appear** | The file must be named exactly `assets/profile.jpg` (not `.jpeg` or `.JPG`). |
| **CV download gives 404** | The PDF name in `cv/` must match the name in `js/data.js` exactly, including capitals, and must be pushed to GitHub. |
| **"Authentication failed" / "Permission denied"** | Sign in again through the browser prompt, or use a Personal Access Token as the password (section 3.3). Make sure the URL has *your* username. |
| **`! [rejected] main -> main (non-fast-forward)`** | The remote has commits you do not have. Run `git pull --rebase origin main`, then `git push`. |
| **`remote origin already exists`** | Run `git remote set-url origin https://github.com/<username>/portfolio.git`. |
| **`'git' is not recognized`** | Close and reopen PowerShell after installing Git (or restart the computer). |
| **Page blank after editing `data.js`** | A missing comma or quote. Press `F12` → Console; it names the line. |
| **Changes not visible online** | Wait 1-2 minutes, then hard-refresh (`Ctrl + F5`). |

---

## 7. Optional: your own domain
1. Buy a domain from any registrar.
2. In the repo, **Settings → Pages → Custom domain**, type it (e.g. `moinshaik.dev`) and save. GitHub creates a `CNAME` file for you.
3. At your registrar add DNS records:
   - apex domain (`moinshaik.dev`): four **A** records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www` subdomain: a **CNAME** record → `<username>.github.io`
4. Back in **Settings → Pages** tick **Enforce HTTPS** once the certificate is ready (can take up to an hour).
5. Update the `canonical` / `og:url` tags in `index.html` and the `repo` name in `404.html` if needed.

---

*Built with plain HTML, CSS and vanilla JavaScript. The only external resource is Google Fonts (Inter and Space Grotesk).*
