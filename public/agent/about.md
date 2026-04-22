# About Replay

**Canonical URL:** https://www.replay.io/about  

The About experience is driven partly by **Basehub CMS** content (hero title, subtitle, and the two long-form story panels). Below is **static copy** that is hard-coded in the repo or safe to quote; for the latest hero lines and rich-text panels, use the HTML page.

---

## Company stats (hard-coded in `src/components/about/Hero.tsx`)

| Label     | Value |
|-----------|-------|
| Founded   | 2021  |
| Employees | 8  |
| Countries | 3  |

---

## Page structure (as implemented)

1. **Center hero** — Title and subtitle come from CMS (`hero.title`, `hero.subTitle`).

2. **Panel: “Our Belief”** — `superTitle` is fixed in code as **Our Belief**. Title and body come from CMS (`hero.title1`, `hero.description1`).

3. **Panel: “The Future”** — `superTitle` is **The Future**. Title and body come from CMS (`hero.title2`, `hero.description2`).

---

## Meet the Team (intro + members in repo)

**Headline:** Meet the Team  

**Intro:** Replay is a **distributed company**, founded by people who worked on fully distributed teams at companies like **Mozilla**. They work across the globe, focus less on hours and more on building a great product, and describe the approach as **“it’s a relay, not a sprint.”**

### People featured on the page (bios shortened; full text on site)

- **Brian Hackett — CEO** — Background in helping people understand complex software (Stanford Ph.D., ~10 years at Mozilla on JavaScript VM work, developed a precursor to Replay). Described as a nomadic adventurer (sailing, van travel).

- **Mark Erikson — Software engineer** — Redux maintainer, creator of Redux Toolkit, active in React/Redux communities (e.g. Reactiflux). Southwest Ohio.

- **Dominik Seifert — Software engineer** — Broad experience (MMORPG servers, CUDA, full-stack). PhD focused on analyzing control/data flow; based in Taiwan.

---

## Values section (“Embedded values” themes)

Two pillars on the page:

1. **The code behind our code** — Integrity, honesty, and decency as **constraints**, not just aspirations; principles behind actions and decisions. Links out to a Notion page on Replay’s principles (URL on live site).

2. **Embedded values** — Making software development **faster, more accessible, more inclusive, and more exciting**; building toward broad technical literacy and better ability to meet large challenges. Also links to Notion for “Learn more.”

---

## Links

- Homepage: https://www.replay.io  
- Docs: https://docs.replay.io  
- Principles / values (Notion, as linked from site): see buttons **Learn more →** on the About page for current URLs.  
