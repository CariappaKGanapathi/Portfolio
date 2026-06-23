# CLAUDE.md

Personal portfolio site for Cariappa K Ganapathi. Live at **https://cariappa.dev**.

## Stack

- **Hugo** (static site generator) — `v0.157.0+extended+withdeploy` installed locally via Homebrew.
- **[Oat UI](https://github.com/knadh/oat)** — minimal CSS/JS framework, loaded from unpkg CDN (`@knadh/oat@0.4.2`).
- Custom theme lives in [themes/portfolio/](themes/portfolio/), set via `theme = 'portfolio'` in [hugo.toml](hugo.toml).

## How content works

The home page is a single-page layout. [themes/portfolio/layouts/index.html](themes/portfolio/layouts/index.html) composes partials in order: hero → experience → projects → skills → contact.

Content is **data-driven**, not markdown-driven. Edit these TOML files to change what the site shows:

- [data/experience.toml](data/experience.toml) — work history (jobs → highlights → points).
- [data/projects.toml](data/projects.toml) — project cards.
- [data/skills.toml](data/skills.toml) — skill categories.

Site-wide info (name, role, tagline, email, github, linkedin, `baseURL`) lives in [hugo.toml](hugo.toml) `[params]`.

The `content/blog/` section holds posts (see **Blog** below).

Partials are in [themes/portfolio/layouts/partials/](themes/portfolio/layouts/partials/). Custom styles in [static/css/custom.css](static/css/custom.css), theme toggle (light/dark, persisted to `localStorage`) in [static/js/theme.js](static/js/theme.js).

## Blog

Posts live in `content/blog/` as **leaf bundles** — one folder per post so the markdown and its images travel together:

```
content/blog/
  _index.md                     # section index page (title only)
  <post-slug>/                  # folder name = URL slug → cariappa.dev/blog/<post-slug>/
    index.md                    # the post (frontmatter + body)
    diagram.png                 # images sit beside index.md
```

**Frontmatter** (in each `index.md`):

```toml
+++
date = '2026-06-23'
draft = false      # true = excluded from build
title = 'My First Post'
summary = 'One-liner shown on the /blog/ index.'
+++
```

**Images:** drop files into the post's own folder and reference by bare filename — `![alt](diagram.png)`. Hugo resolves and copies them automatically; do **not** put post images in `static/`.

**Layouts** (in [themes/portfolio/layouts/blog/](themes/portfolio/layouts/blog/)):
- [list.html](themes/portfolio/layouts/blog/list.html) — `/blog/` index; lists posts (title, date, summary) by date desc. Falls back to a "Coming Soon" screen when there are zero posts.
- [single.html](themes/portfolio/layouts/blog/single.html) — individual post page (title, date, 720px readable column, "← All posts" link).

Blog styling lives in [static/css/custom.css](static/css/custom.css) under the `Blog list` / `Blog post` sections and respects the light/dark theme vars.

**Add a post:** create `content/blog/<slug>/index.md`, fill frontmatter, paste body, drop images in the folder → preview with `hugo server` → `./deploy.sh`.

## Local development

```bash
hugo server        # live-reload dev server (usually http://localhost:1313)
hugo --minify      # production build into public/
```

`public/` and `resources/` are gitignored — they're build artifacts.

## Deployment

`./deploy.sh` builds and ships the site. It:

1. Runs `hugo --minify` → outputs to `public/`.
2. `rsync -avz --delete` of `public/` to the VPS over SSH.

Target (hardcoded in [deploy.sh](deploy.sh)):

| Setting | Value |
|---|---|
| Remote user | `ec2-user` |
| Remote host | `15.207.111.73` (AWS EC2, ap-south-1 / Mumbai) |
| Remote path | `/var/www/portfolio` |
| SSH key | `~/.ssh/personal_aws.pem` |

A web server on the VPS (nginx/similar — config lives on the server, not in this repo) serves `/var/www/portfolio` at `cariappa.dev`. The `--delete` flag means files removed locally are removed on the server too.

**Deploy flow:** edit data/content → `./deploy.sh`. No CI/CD; deploys are manual from the local machine that holds the SSH key.

## Source control

GitHub: `CariappaKGanapathi/Portfolio` (remote `origin`), default branch `main`.

## tools/pdf-extract

A small standalone Go utility ([tools/pdf-extract/main.go](tools/pdf-extract/main.go)) that dumps plain text from a PDF — used to extract resume content (`Cariappa K Ganapathi Resume.pdf`) into the site data. Not part of the build or deploy. Run with `go run . <file.pdf>` from that dir.
