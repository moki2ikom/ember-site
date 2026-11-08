# Ember & Oak — Build Plan

A one-page site for a small-batch coffee roastery in Bengaluru. Warm, crafted and slightly
editorial: closer to a printed tasting card than a SaaS landing page. Plain HTML, CSS and
JavaScript, no frameworks, no build step.

---

## 1. Design direction

- **Paper, not screen.** A cream paper ground, ink-black type, one burnt-ember accent and a
  deep olive-green. Think letterpress menus, roast stamps and ruled notebooks.
- **Asymmetry with intent.** Section numbers, hanging labels, offset cards and oversized serif
  headings. Avoid centred hero stacks, rounded card grids and drop shadows.
- **Type does the decorating.** Hairline rules, small-caps labels, italic origin names and
  numeral-led sections instead of icons and illustrations.
- **Texture from CSS.** A subtle SVG grain overlay and printed-edge rules; no stock photography
  and no external image dependencies. Photography can be added later without redesign.
- **Quiet motion.** Short fades and 8–12px rises on scroll; nothing moves under
  `prefers-reduced-motion: reduce`.

---

## 2. Page sections

Order follows the brief. All navigation anchors point to section IDs.

| # | Section | Content | Mobile (390px) | Desktop |
|---|---------|---------|---------------|---------|
| 0 | Skip link + header | Wordmark "Ember & Oak", anchors: Roasts, Quiz, Plans, Origins; "Subscribe" CTA | Wordmark + disclosure menu (`<details>`), CTA stays visible | Single row, nav right-aligned |
| 1 | Hero | Eyebrow "Small-batch roastery · Bengaluru", H1 "Coffee with the patience of the old city.", one-line story, two CTAs, "Roasted this week" stamp | H1 ≈44px, stacked CTAs, stamp below | H1 up to 76px, asymmetric two-column with stamp in right margin |
| 2 | The roasts | Three cards: number, name, roast level, origin + altitude, tasting notes, "best for", link to quiz | Stacked cards, full-width | Three columns, middle card offset 24px |
| 3 | Find your roast | Three-question quiz with a result card (see §4) | One question per view, full-width | Quiz on Oak band, question left and result/notes right |
| 4 | Subscription plans | Monthly, fortnightly, weekly; price per delivery, cadence, inclusions, CTA | Stacked, featured plan first? No — keep cadence order, mark fortnightly | Three columns, fortnightly raised and tagged "Most popular" |
| 5 | Where the beans come from | Three origins, producers, altitude, varietal; short editorial intro; optional inline SVG map of South India | Stacked origin list | Two-column intro + list; map as a supporting panel |
| 6 | Footer | Address in Bengaluru, hours, email, Instagram, small print | Stacked | Four columns |

### Suggested copy

- **Hero story line:** "We roast five kilos at a time, twice a week, in a garage off Church
  Street — small enough to taste every batch."
- **Roast 01 — Ember** · Dark · Chikmagalur, Karnataka · 1,150 m · dark chocolate, molasses,
  toasted almond · best for espresso, moka pot, milk drinks.
- **Roast 02 — Oak** · Medium · Coorg, Karnataka · 1,050 m · caramel, hazelnut, orange peel ·
  best for French press and everyday black coffee.
- **Roast 03 — Bloom** · Light · Araku Valley, Andhra Pradesh · 1,350 m · jasmine, apricot,
  honey · best for filter and pour-over.
- **Plans:** Monthly ₹1,250 per 250 g delivery; Fortnightly ₹1,180; Weekly ₹1,090. All include
  free delivery in Bengaluru, pause/skip/cancel anytime, prices inclusive of GST. Prices are
  sample copy, kept in one clearly editable block.
- **Footer:** Ember & Oak Roastery, 14 Church Street, Bengaluru 560001, Karnataka. Open
  Saturday–Tuesday, 8am–4pm. hello@emberandoak.in.

Copy guardrails: no "organic", "fair trade" or award claims unless they can be verified; no
lorem ipsum in the final build.

---

## 3. Design system

### 3.1 Type

- **Display:** Fraunces (serif, variable), for the wordmark, headings, prices and numerals.
- **Body/UI:** Karla (sans), for body copy, labels, buttons and form controls.
- Load via Google Fonts with `preconnect` and `font-display: swap`; maximum three weights.
  Fallbacks: Georgia/serif and system-ui/sans-serif. Two families only.
- **Modular scale:** 1.25, base 16px.
- **Rules:** body line length 60–68ch; headings 1.02–1.2 line-height; display letter-spacing
  -0.02em; small-caps labels +0.12em.

| Token | Size | Line height | Use |
|-------|------|-------------|-----|
| `--step--1` | 0.8rem / 12.8px | 1.5 | Eyebrows, labels, fine print (uppercase) |
| `--step-0` | 1rem / 16px | 1.65 | Body copy, inputs |
| `--step-1` | 1.25rem / 20px | 1.5 | Lede, quiz questions, nav on desktop |
| `--step-2` | 1.5625rem / 25px | 1.3 | Card titles, roast names, plan names |
| `--step-3` | 1.953rem / 31.25px | 1.2 | H2 mobile, result heading |
| `--step-4` | 2.441rem / 39.06px | 1.1 | Pull quotes, origin names, H2 tablet |
| `--step-5` | 3.052rem / 48.83px | 1.05 | H2 desktop, hero mobile |
| `--step-6` | 3.815rem / 61.04px | 1.02 | Hero tablet |
| `--step-7` | 4.768rem / 76.29px | 1.0 | Hero desktop |

Fluid roles:

- **H1:** `clamp(--step-5, 7.2vw + 1rem, --step-7)` → 48.8px at 390px, 76.3px at 1200px+.
- **H2:** `clamp(--step-3, 3.2vw + 0.9rem, --step-5)` → 31.25px at 390px, 48.8px at 1200px+.
- **Body stays 16px minimum** on all screens; no fluid body text below 16px.

### 3.2 Colour palette — five colours

| Colour | Hex | Role | Contrast |
|--------|-----|------|----------|
| Paper | `#F7F1E6` | Page background, text on dark bands | Ink on Paper: **15.15:1** |
| Ink | `#211B16` | Body text, header/footer bands, rules | Paper on Ink: **15.15:1** |
| Ember | `#A6431C` | Primary accent, primary buttons, links, quiz progress | Ember on Paper: **5.43:1**; Paper on Ember: **5.43:1** |
| Oak | `#3B4735` | Secondary surface (quiz band), labels, decorative blocks | Paper on Oak: **8.73:1** |
| Clay | `#6B5B47` | Muted text, hairlines, input borders | Clay on Paper: **5.81:1** |

Usage rules:

- No sixth colour. Tints are made with opacity and are decorative only (texture, rules,
  backgrounds) — never for text.
- On Paper, Ember is safe for text and fills. On Oak or Ink, Ember is **fill only** with Paper
  text (Ember text fails on dark grounds); body text becomes Paper.
- Clay is only for text/rules on Paper; it fails on dark grounds. On dark, use Paper and
  opacity for rules only.
- Links are Ember with an underline, not colour alone. Buttons: Ember fill + Paper text, or
  Ink outline on Paper; on dark, Paper fill + Ink text.
- Focus ring: 2px Paper + 2px Ink two-tone ring with 3px offset, visible on every surface.
- All body and UI text meets 4.5:1; large display text meets at least 3:1.

### 3.3 Layout and components

- Content max-width 1180px; gutters `clamp(20px, 5vw, 64px)`.
- Section rhythm: 64px mobile, 112px desktop.
- Breakpoints: 640px, 900px, 1200px. Mobile-first CSS.
- Cards: 1px Clay border, Paper fill, 2px radius maximum; no shadows. One offset tinted block
  or Ember rule per card for character.
- Buttons: rectangular, 1px border, min-height 44px, generous horizontal padding; arrow glyph
  as text, not an icon font.
- Header: sticky but paper-coloured; collapses to a `<details>` menu under 900px.
- Grain texture: inline SVG data URI at 3–5% opacity over Paper only, disabled in print.
- Physical checks at 390px: no horizontal scroll, no text under 16px body, 44px tap targets.

---

## 4. How the roast quiz works

### Questions and scoring

Each option maps to exactly one roast. Q1 and Q3 are worth 1 point; Q2 (flavour) is worth 2
points because it is the most deliberate preference.

| Question | Option A | Option B | Option C |
|----------|----------|----------|----------|
| **Q1. How do you brew?** | Pour-over or filter → **Bloom** (1) | Espresso or moka pot → **Ember** (1) | French press or cold brew → **Oak** (1) |
| **Q2. What do you want in the cup?** | Dark chocolate, molasses → **Ember** (2) | Caramel, hazelnut, orange peel → **Oak** (2) | Jasmine, apricot, honey → **Bloom** (2) |
| **Q3. How do you take it?** | With milk → **Ember** (1) | Black, no sugar → **Bloom** (1) | Depends on the day → **Oak** (1) |

Maximum score: 4 points. Highest total wins.

**Tie rule:** only a 2–2 tie is possible. It always includes the Q2 winner; the Q2 answer wins
the tie because flavour preference is weighted and most explicit. No hidden randomisation.

### Flow

1. Section intro: "Three questions. One bag that fits."
2. One question per view, with "Question 1 of 3", a thin progress bar and the rule line.
3. Selecting a radio enables no auto-advance; the user presses **Next**. **Back** is available
   from Q2 onward. Answers can be changed before submitting.
4. The final button is **See my roast**.
5. Result replaces the question panel: roast name, roast level, tasting notes, a two-sentence
   "why this one", and two actions — **Choose a plan** (anchors to `#plans`) and **See all
   roasts** (`#roasts`), plus **Start over**.
6. Start over clears all selections and returns to Q1 with focus on its legend.
7. State lives in memory only — no cookies, no storage, no URL changes.

### Result copy

- **Ember:** "You want weight and warmth: dark chocolate and molasses with a finish that stays.
  Keep it for espresso, moka or a proper flat white."
- **Oak:** "You want balance: caramel and hazelnut with just enough orange peel. Forgiving in a
  French press and good black, any morning."
- **Bloom:** "You want brightness: jasmine, apricot and honey. Let a filter or pour-over open
  it up."

### Accessibility and fallbacks

- Native `<fieldset>` + `<legend>` + radio inputs; labels wrap the full option row.
- Progress bar has text ("Question 1 of 3") and `role="progressbar"` with `aria-valuenow`.
- Step changes and the result are announced via a polite live region; focus moves to the new
  legend or result heading.
- If the user presses Next without a choice, show an inline message tied with
  `aria-describedby` and focus the first radio — do not rely on a disabled button alone.
- Fully keyboard operable with arrow keys and Tab; visible focus at all times; no time limits.
- No-JS: all three questions are visible in the base HTML, followed by a `<noscript>` note
  explaining the quiz needs JavaScript, with the three roast summaries already on the page.
  Buttons use `type="button"` so nothing submits or reloads without JS.

---

## 5. Verification checklist

- **390px:** every section reviewed; header disclosure, hero wrapping, three cards, quiz,
  plans, origins, footer; no overflow; 44px targets.
- Also spot-check 320px, 768px, 1024px, 1440px.
- Keyboard-only pass through header, quiz and footer links.
- Contrast re-checked for every foreground/background pair; no text in Clay on dark or Ember
  on dark.
- Headings sequential (one H1), landmarks (`header`, `main`, `nav`, `footer`), skip link,
  descriptive link text.
- Real alt text for the SVG map and any later photography; decorative texture marked
  `aria-hidden` / empty alt.
- `prefers-reduced-motion` verified; no autoplay, no parallax.
- No external requests except the two font families; JS is one small file with no libraries.
- Lighthouse accessibility and performance pass on mobile after the final section.

---

## 6. Files and build order

Files: `index.html`, `styles.css`, `quiz.js`, `PLAN.md`. No other dependencies. Optional
`assets/` only if photography is supplied later.

Build order, one commit per finished section as required by `AGENTS.md`:

1. `PLAN.md`
2. Page shell: skip link, header, hero
3. The three roasts
4. Quiz (HTML, CSS and `quiz.js`)
5. Subscription plans
6. Origins
7. Footer
8. Polish pass: 390px sweep, contrast/focus audit, reduced motion, performance

---

## 7. Non-goals

- No cart, checkout, payment or account system; plan CTAs use a `mailto:` link or anchor.
- No CMS, newsletter backend, analytics or cookies.
- No stock photography, icon library, carousel or dark mode.
- No animation that ignores reduced-motion preferences.
