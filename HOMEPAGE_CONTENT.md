# Homepage Content — Fill-In Sheet

Fill in the sections below with your real content. Leave a field as `TODO` if you
don't have it yet — I'll leave the current placeholder in place for anything marked
`TODO`. When you're done, tell me to "read in HOMEPAGE_CONTENT.md" and I'll update
`resources/js/data/portfolio.ts` to match.

Notes before you start:
- Text wrapped in `**double asterisks**` renders **bold** on the site — use it to
  highlight key words (skills, tech, numbers), same as in the current content.
- Anywhere it says "Image URL", you can either paste a link to an already-hosted
  image, or write `UPLOAD: <describe the image>` and drop the file in
  `public/images/` — tell me the filename and I'll wire up the path.
- Repeatable sections (roadmap, skills, games, etc.) can have as many entries as
  you want — copy the block for more, delete a block for fewer.
- Delete the `(current: …)` hints once you've replaced them; they're just there so
  you know what's live today.

---

## 1. Site-wide

- **Name:** (current: Brian Olthof)
- **Accent color (hex):** (current: #FF7A29)
- **Background video/image URL:** (current: /videos/background.mp4)
- **Email:** (current: Brianolt@gmail.com)
- **GitHub URL:** (current: https://github.com/primtimed)
- **LinkedIn URL:** (current: https://linkedin.com/in/brian-olthof-63789126a)

## 2. Hero

- **Tagline:** (current: Software & Game engineering)
- **Intro (meta description, 1 sentence):** (current: Building scalable gameplay systems, software tools, and interactive applications.)
- **Focus tags** (short interest/hobby tags shown in the hero, list as many as you like):
  1. (current: Gaming)
  2. (current: Archery)
  3. (current: Summer terrace)
  4. (current: Anime / Series / Esport)
  5. (current: Music)

## 3. About

- **About eyebrow (small label above heading):** (current: Software engineer specialized in gameplay systems)
- **About heading:** (current: My name is Brian Olthof, game developer.)
- **Photo URL:** (current: a Discord CDN link — this will expire, replace it with a permanent image)
- **About paragraph(s)** (one or more paragraphs, markdown bold supported):
  1. (current: **Unity Developer** with **4 years of experience** building gameplay systems and tools in **C#** and **Unity**. Experienced in **object-oriented programming**, **gameplay mechanics**, **debugging**, and **version control**. Also skilled in **PHP (Laravel)**, **TypeScript**, and **Vue 3** through professional web development experience. Currently completing a **Bachelor's degree in Creative Media & Game Technologies** and seeking a **Junior Unity Developer** position where I can contribute to gameplay programming and continue growing as a game engineer.)
- **About CTA prompt (question above the button):** (current: Are you interested in my work?)
- **About CTA label (button text):** (current: Contact me!)

### About stats (small stat tiles — icon + number + label)

Icon options: `device`, `controller`, `package`, `trophy`

| Icon | Value | Label |
|---|---|---|
| device (current) | 4+ | YEARS EXPERIENCE |
| controller (current) | 2 | Game Prototypes |
| package (current) | 3 | Unity Packages |
| trophy (current) | 1 | Personal Milestone |

(Add/remove rows as needed.)

## 4. Roadmap / Timeline

One entry per milestone in your journey. `Details` supports `## Headings`, `- bullet lists`, and `**bold**`. `View Project URL` is optional — leave blank if there's nothing to link.

**Entry 1**
- Title: (current: From Pastry Kitchen to Game Studio)
- Meta (date range): (current: 2018 - 2021)
- Card description (short teaser): (current: Trained as a **pastry chef** before discovering a growing passion for building games.)
- Modal details:
```
(current)
## Details
- Studied professional baking & pastry techniques at Roc van Twente.
- Realized a passion for **game design** and **systems thinking** on the side.
- Started self-teaching **Unity** and **C#** in spare time.
```
- View Project URL (optional):

**Entry 2**
- Title: (current: Started Creative Media & Game Technologies)
- Meta: (current: 2022 - Present)
- Card description: (current: Enrolled in a Bachelor's program focused on **gameplay programming** and **Unity development**.)
- Modal details:
```
(current)
## Details
- Studied **Gameplay Programming** using **Unity** and **C#**.
- Gained experience with **AI**, **Networking**, and **Computer Graphics**.
- Worked on collaborative game projects using **Git** and Agile workflows.
```
- View Project URL (optional):

**Entry 3**
- Title: (current: Built a Multiplayer Survival Prototype)
- Meta: (current: 2024)
- Card description: (current: Designed and built a **multiplayer survival game** prototype using Unity Netcode.)
- Modal details:
```
(current)
## Details
- Developed player movement, inventory, crafting, and interaction systems.
- Implemented multiplayer synchronization using **Unity Netcode**.
- Optimized gameplay systems to improve performance and stability.
```
- View Project URL (optional):

**Entry 4**
- Title: (current: Software Development Internship at Talentrush)
- Meta: (current: 09/2025 - 07/2026)
- Card description: (current: Applying engineering skills to professional web development with **Laravel** and **Vue 3**.)
- Modal details:
```
(current)
## Details
- Developed and maintained web applications using **PHP (Laravel)**, **Vue 3**, and **TypeScript**.
- Built reusable frontend components and backend API endpoints.
- Fixed bugs and implemented new features based on client requirements.
```
- View Project URL (optional):

**Entry 5**
- Title: (current: Looking Ahead: Junior Unity Developer)
- Meta: (current: 2026 →)
- Card description: (current: Seeking a **Junior Unity Developer** role to keep growing as a gameplay engineer.)
- Modal details:
```
(current)
## Details
- Contribute to **gameplay systems** on a professional production team.
- Help ship a commercial Unity title.
- Keep building personal prototypes and sharpening **C#** & **systems design** skills.
```
- View Project URL (optional):

(Copy the block above for additional milestones, or delete entries that no longer apply.)

## 5. Skills

Levels are 1–5 (1 = beginner, 5 = expert). Icon options: `code`, `gamepad`, `network`, `tools`

**Category: Gameplay Engineer** (icon: gamepad)
| Skill | Level (1-5) |
|---|---|
| Unity | 4 |
| C# | 4 |
| AI | 4 |
| Input System | 3 |
| Gameplay Engineering | 3 |
| Physics | 3 |

**Category: Web Engineer** (icon: code)
| Skill | Level (1-5) |
|---|---|
| PHP | 3 |
| Vue 3 | 3 |
| JavaScript / TypeScript | 2 |

**Category: Tools** (icon: code)
| Skill | Level (1-5) |
|---|---|
| Git | 4 |
| JetBrains Rider | 4 |
| Jira | 3 |

**Category: Languages** (icon: code)
| Skill | Level (1-5) |
|---|---|
| Dutch | 5 |
| English | 4 |
| German | 2 |

(Add/remove categories and rows as needed — these are currently placeholders you should confirm or correct.)

## 6. Featured Games

- **Itch.io URL (link for the "see more" button):** (current: # — placeholder)

One block per game card. Status options: `Prototype`, `In Development`, `Released`.

**Game 1**
- Title: (current: Momentum FPS)
- Tagline: (current: Multiplayer movement tech — wallrun, dash, grapple, slide.)
- Genre: (current: Multiplayer FPS)
- Engine: (current: Unity)
- Status: (current: Prototype)
- Image URL:
- Link URL:

**Game 2**
- Title: (current: Card Tactics AI)
- Tagline: (current: Card strategy game with an AI that adapts mid-match.)
- Genre: (current: Strategy)
- Engine: (current: Unity)
- Status: (current: Prototype)
- Image URL:
- Link URL:

**Game 3**
- Title: (current: Streaming Hub UI)
- Tagline: (current: TV-first, remote-navigable streaming hub interface.)
- Genre: (current: Interactive UI)
- Engine: (current: Web)
- Status: (current: In Development)
- Image URL:
- Link URL:

**Game 4**
- Title: (current: Roguelike Deckbuilder)
- Tagline: (current: Run-based card battler with synergy-driven deck building.)
- Genre: (current: Roguelike)
- Engine: (current: Unity)
- Status: (current: Prototype)
- Image URL:
- Link URL:

**Game 5**
- Title: (current: Gravity Shift)
- Tagline: (current: Puzzle platformer built around flipping gravity mid-jump.)
- Genre: (current: Puzzle Platformer)
- Engine: (current: Unity)
- Status: (current: Prototype)
- Image URL:
- Link URL:

**Game 6**
- Title: (current: Neon Siege)
- Tagline: (current: Tower defense with procedurally generated enemy waves.)
- Genre: (current: Tower Defense)
- Engine: (current: Unity)
- Status: (current: In Development)
- Image URL:
- Link URL:

**Game 7**
- Title: (current: Cooperative Escape Room)
- Tagline: (current: Online co-op puzzle rooms for 2-4 players.)
- Genre: (current: Co-op Puzzle)
- Engine: (current: Unity)
- Status: (current: Prototype)
- Image URL:
- Link URL:

**Game 8**
- Title: (current: Architecture Sandbox)
- Tagline: (current: Playable showcase of state machines and modular systems.)
- Genre: (current: Tech Demo)
- Engine: (current: Unity)
- Status: (current: In Development)
- Image URL:
- Link URL:

**Which of the above are real projects vs. placeholders to delete?**
(Tell me here — e.g. "keep 1 and 3, real; delete the rest" or "all placeholders, replace with: ...")

(Copy a block for additional games.)

## 7. Featured Project (homepage spotlight — your single best project)

- Title: (current: Momentum FPS)
- Tagline: (current: Multiplayer movement tech — wallrun, dash, grapple, slide.)
- Description (1-3 sentences): (current: A multiplayer FPS prototype built around a custom momentum-driven movement system. Focused on server-authoritative networking, client-side prediction, and tuning movement feel so it stays responsive under real-world latency.)
- Image URL:
- Status: (current: Prototype)
- Tags (comma-separated): (current: Unity, C#, Netcode, Multiplayer)
- Highlights (bullet points — what makes this project impressive):
  1. (current: Server-authoritative movement with client-side prediction and reconciliation)
  2. (current: Wallrun, dash, grapple, and slide chained into a single momentum system)
  3. (current: Custom network tick loop tuned for low-latency multiplayer feel)
- Link URL (play/demo):
- Source URL (repo, optional):

### Featured project stats (3 small stat tiles under the spotlight)

| Icon | Value | Label |
|---|---|---|
| device (current) | Unity | Engine |
| controller (current) | Multiplayer | Genre |
| trophy (current) | Prototype | Status |

## 8. Portfolio CTA (bottom banner linking to the /portfolio page)

- Eyebrow: (current: Software & Game engineering)
- Heading: (current: Check out my portfolio)
- Line 1: (current: Are you interested in knowing more about my profile and experience?)
- Line 2: (current: Take a look at my portfolio!)
- Button label: (current: Portfolio)
- Button URL: (current: /portfolio)

---

## Anything else?

Anything about your background, tone, or content strategy I should know before
writing this up (e.g. "I'm not a pastry chef anymore, drop that framing" or
"I don't want to mention I'm still a student")?
