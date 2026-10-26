# Himanshi & Karan · Wedding Invitation

The live invitation is at **https://himanshikapoor3099.github.io/wedding-invite/**

It's a single scrolling page that works best on a phone:

envelope → blessings, names and parents → save the date (scratch card + countdown) →
**#KaranMani-fested**, our story told as a streaming series (with the book proposal and the tennis-court proposal) →
Ivy's memo → Sagan & Cocktails · Mehndi · Haldi · The Wedding → RSVP → families & contacts → sign-off.

All artwork is drawn in code (`js/art.js`): no photographs are used. The page colour blends from one
celebration's palette to the next as you scroll (`THEMES` in `js/page.js`).

## Changing any text, date, venue or photo

Everything lives in **`js/content.js`**. Change the value after the colon and keep the quotes and commas.

| What | Where in `js/content.js` |
|---|---|
| Names, hashtag | `couple` |
| Parents' lines | `hero.brideParents`, `hero.groomParents` |
| Events (date, time, venue, map link, dress code) | `events` |
| Wedding-day rituals | `events.wedding.schedule` |
| Story episodes, the book's pages | `story` |
| Ivy's memo | `ivy` |
| Lines between sections | `passages` |
| RSVP | `rsvp` |
| Contacts | `contacts` |

**Music** is `assets/audio/music.mp3`. Replace that file to change the song.

## Personal links for each guest

Open **`links.html`** on the live site (https://himanshikapoor3099.github.io/wedding-invite/links.html), type the guest names, choose bride's or groom's side and which events they're invited to, and press **Send on WhatsApp**.

The link itself carries the details, so you can also write them by hand:

| Add to the link | What it does |
|---|---|
| `?to=Sharma%20Family` | Envelope says "Dear Sharma Family", and Ivy's memo is addressed to them |
| `?side=groom` | Karan's name and family first; RSVP goes to the groom's family |
| `?events=haldi,wedding` | Shows only those events (`cocktail`, `mehndi`, `haldi`, `wedding`) |

Combine them with `&`: `…/wedding-invite/?to=Sharma%20Family&side=groom&events=haldi,wedding`

## RSVP with a Google Form

Until a form is set, the RSVP button opens WhatsApp to the family contact with the reply already filled in.

To collect RSVPs in a Google Sheet:

1. Create a Google Form with these questions:
   - **Your name** (short answer)
   - **Number of guests** (short answer, or a dropdown 1–10)
   - **Which celebrations will you attend?** (checkboxes: Sagan & Cocktail · 28 Nov, Mehndi · 29 Nov, Haldi · 30 Nov, Wedding · 01 Dec)
2. In the form's **Responses** tab, click **Link to Sheets**.
3. Click **Send → 🔗**, copy the link and paste it into `rsvp.formUrl` in `js/content.js`.
4. Optional: to fill in each guest's name for them, open the form's ⋮ menu → **Get pre-filled link**, type `NAME` in the name question, click **Get link**, and copy the part that looks like `entry.123456789` into `rsvp.nameEntry`.

## Preview on your computer

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publishing

The site is published with GitHub Pages from the `main` branch (Settings → Pages). Every push to `main` updates the live site within a minute or two.
