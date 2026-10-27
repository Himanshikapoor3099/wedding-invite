/* Builds the invitation from js/content.js and runs everything that moves. */
(function () {
    const S = window.SITE;
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
    const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), S);
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const lines = (s) => esc(s).replace(/\n/g, "<br>");
    const TZ = S.timeZone;
    const events = Object.entries(S.events).map(([id, e]) => Object.assign({ id }, e));
    const ORDINAL = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

    /* Each section's palette. While a passage between two sections crosses
       the middle of the screen, the page blends from one palette to the next. */
    const THEMES = {
        // colours taken from the original reference invitation
        peach:    { bg: "#fcefd3", ink: "#4b291b", soft: "#6b4c3f", accent: "#b48a52" },
        desk:     { bg: "#f6ead9", ink: "#4b291b", soft: "#6b4c3f", accent: "#b48a52" },
        cocktail: { bg: "#0f1a33", ink: "#eef2f8", soft: "#b8c4d8", accent: "#c9d1dc" },
        haldi:    { bg: "#fdf4e2", ink: "#7a5aa8", soft: "#8a5a4a", accent: "#e8a33d" },
        wedding:  { bg: "#ece0cc", ink: "#6b2a12", soft: "#7a5a3c", accent: "#a8452f" },
        paper:    { bg: "#e5d7c3", ink: "#7a4900", soft: "#7a5a3c", accent: "#9a7259" },
    };

    /* ---------- paintings ----------
       Each slot looks for assets/art/<name>.jpg, then .png, then .webp. If
       none exists yet, it shows a labelled placeholder so it's clear which
       painting goes where (see ARTWORK-BRIEF.md). */
    const ART_DIR = "assets/art/";
    const EXTS = ["jpg", "png", "webp"];
    const PLACEHOLDERS = {
        "door-closed": "The carved front door",
        "ivy-room": "Ivy by the dresser, invitation in her mouth",
        "book-cover": "The red book on the desk",
        "ch1-fixture": "The football tournament",
        "ch2-metro": "The i10 at Naraina Metro",
        "ch3-food": "Momos, chai and black coffee",
        "ch4-poles": "Mountains by night, beach at sunset",
        "ch5-book": "The card between the pages",
        "ch6-tennis": "On one knee on the tennis court",
        "finale": "The three of you, walking home",
        "ev-cocktail": "Cocktail night in blue and silver",
        "ev-haldi": "The haldi courtyard",
        "ev-wedding": "The royal mandap",
    };
    function findArt(name, done) {
        let i = 0;
        const img = new Image();
        img.decoding = "async";
        img.onload = () => done(img);
        img.onerror = () => { if (++i < EXTS.length) img.src = `${ART_DIR}${name}.${EXTS[i]}`; else done(null); };
        img.src = `${ART_DIR}${name}.${EXTS[0]}`;
    }
    function artSlot(el) {
        const name = el.dataset.art;
        el.classList.add("art");
        findArt(name, (img) => {
            if (img) {
                img.alt = PLACEHOLDERS[name] || "";
                el.prepend(img);
                el.classList.add("has-art");
            } else if (!el.hasAttribute("data-art-optional")) {
                el.classList.add("missing");
                el.insertAdjacentHTML("afterbegin", `<span class="ph"><small>Painting</small><b>${esc(name)}</b><em>${esc(PLACEHOLDERS[name] || "")}</em></span>`);
            }
        });
    }

    /* ---------- monogram: the painted one if it exists, else a typeset one ---------- */
    function monogram(el) {
        findArt("monogram", (img) => {
            if (img) { img.alt = "H & K"; el.appendChild(img); el.classList.add("has-art"); return; }
            const [h, k] = S.couple.initials;
            el.innerHTML = `<span class="mono-type" aria-label="${esc(h)} and ${esc(k)}"><i>${esc(h)}</i><i>${esc(k)}</i></span>`;
        });
    }

    /* ---------- dates ---------- */
    const at = (date, time) => new Date(`${date}T${time}:00${TZ.offset}`);
    function range(e) {
        const start = at(e.date, e.start);
        let end = at(e.date, e.end);
        if (end <= start) end = new Date(end.getTime() + 86400000);
        return { start, end };
    }
    const fmt = (d, opts) => d.toLocaleDateString("en-GB", Object.assign({ timeZone: TZ.name }, opts));
    const utcStamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const mapsUrl = (e) => e.mapUrl || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(e.venue + ", " + e.address);

    /* ---------- text fields ---------- */
    $$("[data-k]").forEach((el) => {
        const v = get(el.dataset.k);
        if (v) el.innerHTML = lines(v); else el.hidden = true;
    });
    document.title = `${S.couple.bride} & ${S.couple.groom} · Wedding Invitation`;

    /* ---------- behind the door ---------- */
    $("#blessings").innerHTML = S.invite.blessings.map((b) => `<span lang="${b.lang}">${esc(b.line)}</span>`).join("");
    const names = S.groomFirst ? [S.couple.groomFull, S.couple.brideFull] : [S.couple.brideFull, S.couple.groomFull];
    $("#couple").innerHTML = `<span class="hero-in" style="--d:1.1s">${esc(names[0])}</span><i class="hero-in" style="--d:1.5s">&amp;</i><span class="hero-in" style="--d:1.8s">${esc(names[1])}</span>`;
    const parentLines = [
        { name: S.couple.brideFull, p: S.invite.brideParents },
        { name: S.couple.groomFull, p: S.invite.groomParents },
    ];
    if (S.groomFirst) parentLines.reverse();
    $("#parents").innerHTML = parentLines.map((x) => `<p><b>${esc(x.name)}</b><span>${lines(x.p)}</span></p>`).join('<i class="amp">&amp;</i>');

    /* ---------- countdown ---------- */
    const target = range(S.events[S.saveTheDate.countdownTo] || events[0]);
    const firstStart = range(events[0]).start;
    const lastEnd = range(events[events.length - 1]).end;
    $("#cd-label").textContent = S.events[S.saveTheDate.countdownTo] ? S.saveTheDate.countdownLabel : "until the celebrations begin";
    if (events.length < S.eventCount) {
        $('[data-k="invite.dates"]').textContent = events.map((e) => fmt(at(e.date, e.start), { day: "2-digit", month: "long" })).join(" · ") + " 2026";
    }
    function tick() {
        const now = Date.now();
        if (now >= target.start.getTime()) {
            $("#countdown").hidden = true;
            $("#cd-label").textContent = now >= lastEnd.getTime() ? S.saveTheDate.after : S.saveTheDate.during;
            return;
        }
        if (now >= firstStart.getTime()) $("#cd-label").textContent = S.saveTheDate.during;
        const t = Math.floor((target.start.getTime() - now) / 1000);
        const v = { d: Math.floor(t / 86400), h: Math.floor(t / 3600) % 24, m: Math.floor(t / 60) % 60, s: t % 60 };
        Object.keys(v).forEach((k) => { $(`[data-u="${k}"]`).textContent = String(v[k]).padStart(2, "0"); });
    }
    tick();
    setInterval(tick, 1000);

    /* ---------- the storybook ---------- */
    const ST = S.story;
    const pages = [];
    pages.push(`
        <div class="pg-cover">
          <span class="cover-rule"></span>
          <p class="cover-sub">${esc(ST.subtitle)}</p>
          <h2 class="cover-title">${esc(ST.title)}</h2>
          <div class="cover-mono" data-monogram></div>
          <p class="cover-by">${esc(ST.coverBy)}</p>
          <span class="cover-rule"></span>
          <p class="cover-hint">${esc(ST.openHint)}</p>
        </div>`);
    ST.chapters.forEach((c, i) => {
        let overlay = "";
        if (c.surprise) {
            overlay = `
              <button type="button" class="gift" aria-label="${esc(c.surprise.wrap)}">
                <span class="gift-half gift-l"></span><span class="gift-half gift-r"></span>
                <span class="gift-tag">${esc(c.surprise.wrap)}</span>
              </button>
              ${c.surprise.card ? `<div class="gift-card"><p>${lines(c.surprise.card)}</p></div>` : ""}`;
        }
        if (c.balls) {
            let n = 0;
            overlay = `<div class="balls">${c.balls.split(" ").map((w) => `<span class="ball-word">${w.split("").map((ch) => `<span class="ball" style="--n:${n++}">${esc(ch)}</span>`).join("")}</span>`).join("")}</div>`;
        }
        pages.push(`
          <div class="pg-chapter">
            <div class="pg-art" data-art="${esc(c.art)}">${overlay}</div>
            <div class="pg-text">
              <p class="pg-num">Chapter ${ORDINAL[i] || i + 1}</p>
              <h3>${esc(c.title)}</h3>
              <p>${lines(c.text)}</p>
              ${c.surprise ? `<p class="pg-after">${esc(c.surprise.after)}</p>` : ""}
            </div>
          </div>`);
    });
    pages.push(`
        <div class="pg-chapter pg-finale">
          <div class="pg-art" data-art="${esc(ST.finale.art)}"></div>
          <div class="pg-text">
            <h3>${esc(ST.finale.title)}</h3>
            <p>${lines(ST.finale.text)}</p>
          </div>
        </div>`);

    const book = $("#storybook");
    book.innerHTML = `<div class="story-desk" data-art="book-cover" data-art-optional></div>` + pages.map((p, i) => `
        <div class="page${i === 0 ? " is-cover" : ""}" data-i="${i}">
          <div class="face front">${p}</div>
          <div class="face back"></div>
        </div>`).join("");
    $("#pg-dots").innerHTML = pages.map((_, i) => `<i data-i="${i}"></i>`).join("");
    const pageEls = $$(".page", book);
    let current = 0;
    function showPage() {
        book.classList.toggle("opened", current > 0);
        pageEls.forEach((p, i) => {
            p.classList.toggle("turned", i < current);
            p.classList.toggle("current", i === current);
            p.style.zIndex = i < current ? i + 1 : pageEls.length - i + 1;
        });
        $$("#pg-dots i").forEach((d, i) => d.classList.toggle("on", i === current));
        $("#pg-prev").disabled = current === 0;
        $("#pg-next").disabled = current === pageEls.length - 1;
        $("#book-hint").textContent = current === 0 ? "" : ST.turnHint;
    }
    const turn = (d) => { const n = Math.min(pageEls.length - 1, Math.max(0, current + d)); if (n !== current) { current = n; showPage(); } };
    $("#pg-next").addEventListener("click", () => turn(1));
    $("#pg-prev").addEventListener("click", () => turn(-1));
    pageEls[0].addEventListener("click", () => { if (current === 0) turn(1); });
    let sx = null;
    book.addEventListener("pointerdown", (e) => { sx = e.clientX; });
    book.addEventListener("pointerup", (e) => {
        if (sx == null) return;
        const dx = e.clientX - sx;
        sx = null;
        if (Math.abs(dx) > 40) turn(dx < 0 ? 1 : -1);
    });
    book.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") turn(1); if (e.key === "ArrowLeft") turn(-1); });
    $$(".gift", book).forEach((g) => g.addEventListener("click", (e) => {
        e.stopPropagation();
        g.closest(".pg-chapter").classList.add("unwrapped");
    }));
    showPage();

    /* ---------- events ---------- */
    function calendar(e) {
        const { start, end } = range(e);
        const title = `${e.title} · ${S.couple.bride} & ${S.couple.groom}`;
        const loc = `${e.venue}, ${e.address}`;
        const g = "https://calendar.google.com/calendar/render?action=TEMPLATE"
            + "&text=" + encodeURIComponent(title)
            + "&dates=" + utcStamp(start) + "/" + utcStamp(end)
            + "&location=" + encodeURIComponent(loc)
            + "&details=" + encodeURIComponent(location.href.split("#")[0]);
        const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//HK Wedding//EN", "BEGIN:VEVENT",
            `UID:hk-${e.id}@wedding`, `DTSTAMP:${utcStamp(new Date())}`, `DTSTART:${utcStamp(start)}`, `DTEND:${utcStamp(end)}`,
            `SUMMARY:${title}`, `LOCATION:${loc.replace(/,/g, "\\,")}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
        return { g, ics: URL.createObjectURL(new Blob([ics], { type: "text/calendar" })) };
    }

    $("#events").innerHTML = events.map((e) => {
        const d = at(e.date, e.start);
        const cal = calendar(e);
        const passage = S.passages["to" + e.id[0].toUpperCase() + e.id.slice(1)];
        const schedule = e.schedule ? `
            <div class="schedule-wrap">
              <p class="eyebrow">${esc(e.scheduleTitle)}</p>
              <p class="schedule-hint">${esc(e.scheduleHint)}</p>
              <ol class="schedule">${e.schedule.map((s) => `
                <li><button type="button" aria-expanded="false">
                  <span class="s-time">${esc(s.time)}</span><span class="s-dot"></span><span class="s-name">${esc(s.name)}</span></button>
                  <p class="s-about" hidden>${esc(s.about)}</p></li>`).join("")}
              </ol>
            </div>` : "";
        return `
        <div class="passage">${passage ? `<p>${esc(passage)}</p>` : ""}</div>
        <section class="event ev-${e.id}" id="ev-${e.id}" data-theme="${e.id}">
          <div class="ev-art" data-art="${esc(e.art)}"></div>
          <div class="ev-body">
            <p class="ev-kicker rv">${esc(e.kicker)}</p>
            <h2 class="ev-title rv">${esc(e.title)}</h2>
            <p class="ev-tagline rv">${esc(e.tagline)}</p>
            <div class="date-block rv">
              <span class="db-side">${esc(fmt(d, { weekday: "long" }))}</span>
              <span class="db-mid"><small>${esc(fmt(d, { month: "long" }))}</small><b>${esc(fmt(d, { day: "2-digit" }))}</b></span>
              <span class="db-side">${esc(e.timeLabel)}</span>
            </div>
            <div class="venue rv">
              <p class="v-name">${esc(e.venue)}</p>
              <p class="v-addr">${esc(e.address)}</p>
            </div>
            ${e.note ? `<p class="ev-note rv">${esc(e.note)}</p>` : ""}
            ${e.dressCode ? `<div class="dress rv"><span class="dress-label">Dress code</span><span class="dress-text">${esc(e.dressCode)}</span>
                <span class="swatches">${e.swatches.map((c) => `<i style="background:${c}"></i>`).join("")}</span></div>` : ""}
            ${schedule}
            <div class="ev-actions rv">
              <a class="btn" href="${esc(mapsUrl(e))}" target="_blank" rel="noopener">Directions</a>
              <a class="btn" href="${esc(cal.g)}" target="_blank" rel="noopener">Google Calendar</a>
              <a class="btn" href="${cal.ics}" download="${e.id}.ics">Apple / Outlook</a>
            </div>
          </div>
        </section>`;
    }).join("");

    $$(".schedule button").forEach((b) => b.addEventListener("click", () => {
        const open = b.getAttribute("aria-expanded") === "true";
        $$(".schedule button").forEach((x) => { x.setAttribute("aria-expanded", "false"); x.nextElementSibling.hidden = true; });
        if (!open) { b.setAttribute("aria-expanded", "true"); b.nextElementSibling.hidden = false; }
    }));

    $$("[data-k-passage]").forEach((el) => {
        const t = S.passages[el.dataset.kPassage];
        if (t) el.innerHTML = `<p>${esc(t)}</p>`;
    });

    // paintings and monograms, now that every slot is on the page
    $$("[data-art]").forEach(artSlot);
    $$("[data-monogram]").forEach(monogram);

    /* ---------- RSVP ---------- */
    const contact = S.contacts.people[0];
    const rsvpBtn = $("#rsvp-btn");
    if (S.rsvp.formUrl) {
        let url = S.rsvp.formUrl;
        if (S.rsvp.nameEntry && S.guest) url += (url.includes("?") ? "&" : "?") + encodeURIComponent(S.rsvp.nameEntry) + "=" + encodeURIComponent(S.guest);
        rsvpBtn.href = url;
    } else if (contact) {
        const msg = `Hello! RSVP for ${S.couple.bride} & ${S.couple.groom}'s wedding.\nName: ${S.guest || ""}\nNumber of guests: \nAttending: ${events.map((e) => e.short).join(", ")}`;
        rsvpBtn.href = `https://wa.me/${contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
    }

    /* ---------- families & contacts ---------- */
    $("#family-sides").innerHTML = S.family.sides.map((s) => `
        <div class="side rv">
          <p class="side-family">${esc(s.family)}</p>
          <p class="side-title">${esc(s.title)}</p>
          ${s.names.length ? `<p class="side-names">${s.names.map(esc).join(" · ")}</p>` : ""}
        </div>`).join('<span class="side-amp rv">&amp;</span>');
    $("#contact-list").innerHTML = S.contacts.people.map((p) => {
        const num = p.phone.replace(/\D/g, "");
        return `<li><b>${esc(p.name)}</b><small>${esc(p.role)}</small>
            <span class="c-links"><a href="tel:+${num}">${esc(p.phone)}</a><a href="https://wa.me/${num}" target="_blank" rel="noopener">WhatsApp</a></span></li>`;
    }).join("");

    $("#share-btn").addEventListener("click", async () => {
        const url = location.href.split("#")[0];
        try {
            if (navigator.share) await navigator.share({ title: document.title, text: S.shareText, url });
            else { await navigator.clipboard.writeText(url); $("#share-btn").textContent = "Link copied"; }
        } catch (err) { /* share sheet closed */ }
    });

    /* ---------- colour blending between sections ---------- */
    const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
    const mix = (a, b, t) => "#" + hex(a).map((v, i) => Math.round(v + (hex(b)[i] - v) * t).toString(16).padStart(2, "0")).join("");
    const ease = (t) => t * t * (3 - 2 * t);
    const root = document.documentElement.style;
    const themeMeta = $('meta[name="theme-color"]');
    const flow = $$("#main > section, #main > .passage, #events > section, #events > .passage");
    function applyTheme(th) {
        Object.keys(th).forEach((k) => root.setProperty("--" + k, th[k]));
        themeMeta.content = th.bg;
    }
    function blend() {
        const y = window.scrollY + window.innerHeight * 0.55;
        let i = flow.findIndex((el) => el.offsetTop + el.offsetHeight > y);
        if (i < 0) i = flow.length - 1;
        const el = flow[i];
        if (el.dataset.theme) return applyTheme(THEMES[el.dataset.theme]);
        const prev = flow.slice(0, i).reverse().find((x) => x.dataset.theme);
        const next = flow.slice(i + 1).find((x) => x.dataset.theme);
        const a = THEMES[(prev || next).dataset.theme], b = THEMES[(next || prev).dataset.theme];
        const t = ease(Math.min(1, Math.max(0, (y - el.offsetTop) / el.offsetHeight)));
        const th = {};
        Object.keys(a).forEach((k) => { th[k] = mix(a[k], b[k], t); });
        applyTheme(th);
    }
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) { ticking = true; requestAnimationFrame(() => { blend(); ticking = false; }); }
    }, { passive: true });
    window.addEventListener("resize", blend);
    applyTheme(THEMES.peach);

    /* ---------- the door ---------- */
    findArt("door-closed", (img) => {
        if (!img) return;
        $$("[data-door]").forEach((f) => {
            f.style.backgroundImage = `url("${img.src}")`;
            f.classList.add("painted");
        });
    });

    const audio = new Audio();
    audio.loop = true;
    audio.preload = "none";
    const musicBtn = $("#music");
    function setMusic(on) {
        musicBtn.classList.toggle("off", !on);
        musicBtn.setAttribute("aria-label", on ? "Pause music" : "Play music");
        if (on) audio.play().catch(() => setMusic(false)); else audio.pause();
    }
    musicBtn.addEventListener("click", () => setMusic(audio.paused));

    let opened = false;
    $("#door").addEventListener("click", () => {
        if (opened) return;
        opened = true;
        if (S.musicUrl) { audio.src = S.musicUrl; musicBtn.hidden = false; setMusic(true); }
        document.body.classList.add("door-open");
        setTimeout(() => document.body.classList.add("ready"), 900);
        setTimeout(() => {
            $("#door-screen").remove();
            document.body.classList.remove("locked");
            $("#main").inert = false;
            blend();
            if (location.hash && $(location.hash)) $(location.hash).scrollIntoView();
        }, 2200);
    });

    /* ---------- reveal on scroll ---------- */
    const io = new IntersectionObserver((list) => list.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -10% 0px" });
    $$(".rv, .passage, .event").forEach((el) => io.observe(el));
})();
