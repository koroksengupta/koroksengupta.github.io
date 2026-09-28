# koroksengupta.github.io

Personal website and portfolio for **Korok Sengupta** — User Experience Architect, published as a static site via GitHub Pages at **[koroksengupta.github.io](https://koroksengupta.github.io)**.

The site has two pages:

- **`index.html`** — the main resume/profile page: intro, professional experience timeline, publications, skills, and academic qualifications.
- **`portfolio.html`** — UX case studies, each shown as an image slideshow with a PDF download.

There is no build step. It's plain HTML, CSS, and jQuery — edit a file, commit, push to `master`, and GitHub Pages serves it directly.

## Table of contents

- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Local development](#local-development)
- [Editing content](#editing-content)
  - [Profile / intro](#profile--intro)
  - [Professional experience](#professional-experience)
  - [Publications](#publications)
  - [Skills](#skills)
  - [Academic qualification](#academic-qualification)
  - [Portfolio case studies](#portfolio-case-studies)
  - [CV / résumé PDF](#cv--résumé-pdf)
- [The timeline component](#the-timeline-component)
- [Styling](#styling)
- [Responsive behavior](#responsive-behavior)
- [Deployment](#deployment)
- [Conventions and gotchas](#conventions-and-gotchas)
- [Browser support](#browser-support)
- [License](#license)
- [Contact](#contact)

## Tech stack

| Layer | What's used |
|---|---|
| Markup | Static HTML5, two pages (`index.html`, `portfolio.html`) |
| Styling | Hand-maintained CSS (`assets/css/main.css`, `assets/css/portfolio.css`) + vendor CSS (Font Awesome, Slick carousel) |
| Scripting | jQuery 3.x + small custom script (`assets/js/main.js`) + vendor plugins (Slick carousel, scrolly, breakpoints, browser detection) |
| Carousel | [Slick](https://kenwheeler.github.io/slick/) (`portfolio.html` only, for case-study image slideshows) |
| Icons | [Font Awesome 5](https://fontawesome.com/) (`assets/css/fontawesome-all.min.css` + `assets/webfonts/`) |
| Web font | [Montserrat](https://fonts.google.com/specimen/Montserrat), loaded via `@import` from Google Fonts at the top of `main.css` |
| Hosting | [GitHub Pages](https://pages.github.com/), served straight from the `master` branch — no CI, no build |
| Base template | [Miniport by HTML5 UP](https://html5up.net/miniport) (heavily customized) |

There is no `package.json`, no bundler, and no linter configured for this repo. Every file you see in `assets/` is served byte-for-byte to the browser.

## Project structure

```
.
├── index.html                  # Main resume/profile page
├── portfolio.html              # UX case-study portfolio page
├── LICENSE.txt                 # CC BY 3.0 — see License section below
├── README.md                   # You are here
│
├── images/                     # Profile photo + misc. images used by index.html/portfolio.html
│
└── assets/
    ├── css/
    │   ├── main.css             # Primary stylesheet — hand-edited directly (see Styling)
    │   ├── portfolio.css        # Small set of page-specific overrides for portfolio.html
    │   ├── slick.css / slick-theme.css   # Vendor: Slick carousel
    │   ├── fontawesome-all.min.css       # Vendor: Font Awesome 5
    │   └── images/               # Icons used inline (social links, favicon, etc.)
    │
    ├── js/
    │   ├── main.js               # Site-specific behavior (see below)
    │   ├── util.js                # Vendor: HTML5 UP template helpers (panel, placeholder polyfill, ...)
    │   ├── jquery.min.js, jquery.scrolly.min.js, browser.min.js, breakpoints.min.js
    │   └── slick.js / slick.min.js       # Vendor: Slick carousel
    │
    ├── sass/                     # Original HTML5 UP SCSS source. NOT built or used at runtime —
    │                              # see "Styling" below before touching this.
    │
    ├── webfonts/                  # Font Awesome font files
    │
    └── portfolio/
        ├── Korok_Sengupta_CV.pdf         # The CV linked from both pages
        ├── portfolio01/                  # Careons Healthcare case study images + merged PDF
        ├── porfolio2/                    # DreamFolks case study images
        └── portfolio03/                  # GazeTheWeb / keyboard experiment case study images
```

## Local development

No install step is required. Because the pages use `fetch`/relative asset paths that work fine over `file://` in most browsers, you can often just open `index.html` directly. For a closer match to production (and to avoid any browser quirks with `file://`), serve the folder locally instead:

```bash
# from the repo root
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Any static file server works equally well (`npx serve`, `php -S localhost:8000`, etc.) — nothing here depends on a specific one.

There is no test suite and no linter configured. If you want to sanity-check a change before pushing, the most useful checks are:

- Open both `index.html` and `portfolio.html` in a real mobile-width viewport (or your browser's device toolbar) — this site's history has had more mobile-layout bugs than desktop ones.
- Click through every link and download (CV, case-study PDFs) — several past bugs here were plain 404s from a filename typo.

## Editing content

All page content is hand-authored HTML — there's no CMS or templating. Sections are marked with HTML comments (e.g. `<!-- Item Start -->` / `<!-- Item End -->`) to make each entry easy to find and copy.

### Profile / intro

`index.html`, inside `<article id="top">`. Contains the profile photo, name, social links (Twitter, LinkedIn, Google Scholar, email, CV), and the two intro paragraphs.

### Professional experience

`index.html`, inside `<article id="work">`, as a `<ul class="timeline">` of `<li class="timeline__item">` entries, most recent first.

**To add a new job:** copy an existing `<li class="timeline__item">…</li>` block (not the `<li class="timeline-line">` above it — see [The timeline component](#the-timeline-component)) and edit its content:

```html
<li class="timeline__item">
    <div class="timeline__step">
        <div class="timeline__step__marker timeline__step__marker--orange"></div>
    </div>
    <div class="timeline__time text-right">
        <ul class="timeline__points">
            <li class="h4">Company / Institution</li>
            <li class="h5">MM.YYYY-MM.YYYY (or "present")</li>
            <li class="h6 text-orange">Role title</li>
        </ul>
    </div>
    <div class="timeline__content">
        <ul class="timeline__points">
            <li>What you did, one bullet per &lt;li&gt;.</li>
        </ul>
    </div>
</li>
```

The first entry in the list gets its marker filled in solid (vs. a hollow ring for the rest) automatically via CSS, to indicate it's the current/most recent one — no need to set that by hand.

### Publications

`index.html`, inside `<article id="pub">`. Grouped by `<h3>` year headings, each entry a `<li class="paper-conference">`. Follows a simple APA-ish citation format with a `[BibTeX]` link (and occasionally a `Webpage` or `DOI` link) at the end of each entry.

### Skills

`index.html`, inside `<article id="skills">`, as a `<ul class="timeline_hr">` of `<li class="timeline_hr__item">` categories (Software, Interaction, Visual, Coding). Same copy-a-block-to-add-one workflow as Professional Experience, and the same rule about not duplicating the `<li class="timeline-line">` sibling.

### Academic qualification

`index.html`, inside `<article id="aca">`. Same `.timeline` structure and editing workflow as Professional Experience.

### Portfolio case studies

`portfolio.html`. Each case study is a `<section class="section">` containing a title, a `.slideshow` of `<div class="slide"><img ...></div>` frames (rendered as a Slick carousel — see the inline `<script>` near the bottom of the file), and a download `<form>` pointing at a PDF in `assets/portfolio/`.

To add a new case study, drop its images in a new folder under `assets/portfolio/`, then copy one of the existing `<section class="section">` blocks and update the title, image paths, and PDF link.

### CV / résumé PDF

Both pages link to `assets/portfolio/Korok_Sengupta_CV.pdf`. To update the CV, **replace that file in place** (keep the exact filename) — every link on the site already points to it, so no HTML changes are needed. If you ever do need to rename it, update all references:

```bash
grep -rn "Korok_Sengupta_CV.pdf" index.html portfolio.html
```

There should only ever be **one** CV file in `assets/portfolio/` — a duplicate (`Curriculum_Vitae.pdf`, byte-identical, left over from an earlier update) was removed rather than keeping both around with links split across them.

## The timeline component

The vertical connecting line you see running through Professional Experience, Skills, and Academic Qualification is a single element — `<li class="timeline-line" aria-hidden="true"></li>` — placed once as the *first* child of each `<ul class="timeline">` / `<ul class="timeline_hr">`, sitting outside the repeatable per-entry `<li class="timeline__item">` blocks.

This used to be computed in JavaScript (one `<div class="before">` per entry, sized by a jQuery height calculation on page load). That approach broke repeatedly in practice — entries copy-pasted over time each carried their own duplicate line, and even after fixing that, the line's cached pixel height would go stale once fonts finished loading or the viewport resized, causing it to visibly overshoot into the next section.

It's now pure CSS (`position: absolute; top: 0; bottom: 0;` in `main.css`), so it always exactly fills its container with no computation, no caching, and no timing dependency — it cannot go stale, whether or not JavaScript even runs.

**The one rule to keep this working:** when adding a new entry to any of these three lists, copy a `.timeline__item` (or `.timeline_hr__item`) block — never the `.timeline-line` element. There is a comment in `index.html` right above the Professional Experience list as a reminder.

## Styling

`assets/css/main.css` is the real stylesheet — it's what every page links to, and it's **edited directly**, not generated. `assets/sass/` is the original SCSS source from the HTML5 UP template this site was built from; it has not been kept in sync with `main.css` (there's no build tooling in this repo to compile it, and `main.css` now contains substantial custom CSS — the `.timeline`/`.timeline_hr` components, mobile nav fixes, etc. — that was never added back to the SCSS). Treat `assets/sass/` as historical reference only, not as a source of truth.

`assets/css/portfolio.css` holds a handful of small overrides specific to `portfolio.html` (full-height slideshow container, Slick dot positioning, etc.).

## Responsive behavior

The site is desktop-first with `@media (max-width: 980px / 768px / 736px)` overrides layered on top. A few things worth knowing if you're touching layout:

- The nav bar becomes a horizontally-scrollable single row below 736px (it used to wrap onto a second row that rendered invisibly — white text on white background — so this is intentional, not a default browser behavior).
- The Professional Experience / Academia (`.timeline`) and Skills (`.timeline_hr`) sections switch from a side-by-side column layout to a stacked single column below 768px.
- `user-scalable` is **not** disabled in the viewport meta tag on either page — pinch-zoom is left enabled deliberately, since disabling it is an accessibility regression (notably relevant given the site's subject matter).

## Deployment

This is a `<username>.github.io` repository, so GitHub Pages serves whatever is on the `master` branch directly — there's no separate `gh-pages` branch, no GitHub Actions workflow, and no build artifact. **Pushing to `master` publishes to the live site immediately.**

```bash
git checkout master
git pull
# ...make changes, commit...
git push origin master
```

If you're working from a feature branch, merge it into `master` and push `master` when you're ready for changes to go live:

```bash
git checkout master
git merge --ff-only your-branch-name
git push origin master
```

## Conventions and gotchas

A short list of things that have caused real bugs on this site before, kept here so they don't happen again:

- **Don't duplicate `<li class="timeline-line">`.** See [The timeline component](#the-timeline-component).
- **Check that a new asset's filename matches its HTML reference exactly**, including underscores vs. hyphens and spelled-out numbers (`portfolio03/6GTW_ Solutions 2.png` vs. `5GTW_ Solutions 2.png` was a real 404 caught in this repo's history). A quick way to check for any broken local links after an edit:
  ```bash
  grep -ohE '(src|href|action)="[^"]+"' index.html portfolio.html \
    | sed -E 's/^(src|href|action)="//; s/"$//' \
    | grep -v '^http\|^mailto:\|^#' \
    | sed 's/#.*$//' \
    | sort -u \
    | while read -r f; do [ -z "$f" ] || [ -e "$f" ] || echo "MISSING: $f"; done
  ```
- **OS metadata files** (`.DS_Store`, etc.) are excluded via `.gitignore` — don't `git add -A` from a machine with a permissive global gitignore that doesn't already cover these.
- **`main.css` is the source of truth for styling**, not `assets/sass/`. See [Styling](#styling).
- **No build step means no safety net.** There's no linter or test suite to catch a typo'd class name or a broken link before it ships — the `grep` above and a manual click-through are the closest things this repo has to CI.

## Browser support

No specific browser support matrix is enforced, but the site relies on:

- Flexbox (used throughout the layout and the timeline components)
- The [CSS Font Loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API) is *not* required — the timeline no longer depends on JavaScript or font-load timing at all (see [The timeline component](#the-timeline-component)).
- jQuery 3.x, loaded from `assets/js/jquery.min.js` (bundled, not a CDN — the site has no external JS dependency at request time beyond the Google Fonts CSS import).

## License

`LICENSE.txt` (Creative Commons Attribution 3.0) covers the **[Miniport](https://html5up.net/miniport) template** this site was originally built from (see [html5up.net/license](https://html5up.net/license)), not Korok Sengupta's personal content. The résumé text, publication list, case-study write-ups, images, and CV in this repository are personal/professional content and are not covered by that template license.

## Contact

- **Author:** Korok Sengupta
- **Email:** [tellkorok@gmail.com](mailto:tellkorok@gmail.com)
- **LinkedIn:** [linkedin.com/in/koroksengupta](https://www.linkedin.com/in/koroksengupta/)
- **Google Scholar:** [profile](https://scholar.google.com/citations?user=zQ-OLzsAAAAJ&hl=en)
