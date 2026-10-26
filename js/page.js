/* Builds the invitation from js/content.js and runs everything that moves. */
(function () {
    const S = window.SITE;
    const A = window.ART;
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
    const get = (path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), S);
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const lines = (s) => esc(s).replace(/\n/g, "<br>");
    const rand = (a, b) => a + Math.random() * (b - a);
    const TZ = S.timeZone;
    const events = Object.entries(S.events).map(([id, e]) => Object.assign({ id }, e));
    const [first, second] = S.groomFirst ? [S.couple.groom, S.couple.bride] : [S.couple.bride, S.couple.groom];

    /* Each section's palette. While a passage between two sections crosses
       the middle of the screen, the page blends from one palette to the next. */
    const THEMES = {
        paper:    { bg: "#f4ede1", ink: "#2a1d17", soft: "#6e5a4c", accent: "#9b111e" },
        screen:   { bg: "#121212", ink: "#f2f2f2", soft: "#a3a3a3", accent: "#e50914" },
        memo:     { bg: "#e6dccb", ink: "#2a1d17", soft: "#6e5a4c", accent: "#b3261e" },
        cocktail: { bg: "#0c0b0d", ink: "#f3e6c4", soft: "#b4a685", accent: "#d4af37" },
        mehndi:   { bg: "#0f3a2e", ink: "#f4ead2", soft: "#b7c8b2", accent: "#e9b949" },
        haldi:    { bg: "#f4e3a1", ink: "#3e2b63", soft: "#6b5a86", accent: "#7c5cc4" },
        wedding:  { bg: "#efe3cf", ink: "#5c0f16", soft: "#7a4b3a", accent: "#b8892f" },
    };

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

    /* ---------- simple fields and artwork ---------- */
    $$("[data-k]").forEach((el) => {
        const v = get(el.dataset.k);
        if (v) el.innerHTML = lines(v); else el.hidden = true;
    });
    $$("[data-art]").forEach((el) => { el.innerHTML = A[el.dataset.art]; });
    const monoColours = { gold: A.C.gold, cherry: A.C.cherry, seal: "#f3d9a0" };
    $$("[data-monogram]").forEach((el) => { el.innerHTML = A.monogram(...S.couple.initials, monoColours[el.dataset.monogram]); });
    document.title = `${S.couple.bride} & ${S.couple.groom} · Wedding Invitation`;
    $("#env-names").innerHTML = `${esc(first)} <i>&amp;</i> ${esc(second)}`;

    /* ---------- opening ---------- */
    $("#blessings").innerHTML = S.hero.blessings.map((b, i) => `
        <div class="blessing hero-in" style="--d:${0.2 + i * 0.2}s">
          <span class="bl-symbol" lang="${b.lang}">${esc(b.symbol)}</span>
          <span class="bl-line" lang="${b.lang}">${esc(b.line)}</span>
        </div>`).join("");

    const people = [
        { name: S.couple.brideFull, parents: S.hero.brideParents },
        { name: S.couple.groomFull, parents: S.hero.groomParents },
    ];
    if (S.groomFirst) people.reverse();
    $("#couple").innerHTML = `
        <span class="c-name rv">${esc(people[0].name)}</span>
        <span class="c-parents rv">${lines(people[0].parents)}</span>
        <span class="c-amp rv">&amp;</span>
        <span class="c-name rv">${esc(people[1].name)}</span>
        <span class="c-parents rv">${lines(people[1].parents)}</span>`;

    /* ---------- save the date + countdown ---------- */
    const target = S.events[S.saveTheDate.countdownTo] ? range(S.events[S.saveTheDate.countdownTo]) : range(events[0]);
    const firstStart = range(events[0]).start;
    const lastEnd = range(events[events.length - 1]).end;
    $("#scratch-dates").innerHTML = events.length === 4
        ? lines(S.saveTheDate.dates)
        : events.map((e) => esc(fmt(at(e.date, e.start), { day: "2-digit", month: "short" }))).join(" · ") + "<br>2026 · New Delhi";
    $("#cd-label").textContent = S.events[S.saveTheDate.countdownTo] ? S.saveTheDate.countdownLabel : "until the celebrations begin";

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

    function scratchCard() {
        const box = $("#scratch");
        const cv = $("#scratch-foil");
        const ctx = cv.getContext("2d");
        let done = false, drawing = false, strokes = 0;
        function paint() {
            const r = box.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            cv.width = r.width * dpr; cv.height = r.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const g = ctx.createLinearGradient(0, 0, r.width, r.height);
            g.addColorStop(0, "#a8802c"); g.addColorStop(0.42, "#ecd08a"); g.addColorStop(0.58, "#d8b25e"); g.addColorStop(1, "#9c7322");
            ctx.fillStyle = g; ctx.fillRect(0, 0, r.width, r.height);
            ctx.strokeStyle = "rgba(255,255,255,.5)"; ctx.lineWidth = 1;
            ctx.strokeRect(9.5, 9.5, r.width - 19, r.height - 19);
            ctx.fillStyle = "#fffaf0"; ctx.font = "500 12px Manrope, sans-serif"; ctx.textAlign = "center";
            ctx.fillText(S.saveTheDate.scratch.toUpperCase().split("").join(String.fromCharCode(8202, 8202)), r.width / 2, r.height / 2 + 4);
        }
        paint();
        const pos = (ev) => { const r = cv.getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top]; };
        function scratch(ev) {
            if (!drawing || done) return;
            const [x, y] = pos(ev);
            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2); ctx.fill();
            ctx.globalCompositeOperation = "source-over";
            if (++strokes % 12 === 0) check();
        }
        function check() {
            const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
            let clear = 0;
            for (let i = 3; i < d.length; i += 64) if (d[i] === 0) clear++;
            if (clear / (d.length / 64) > 0.45) reveal();
        }
        function reveal() { done = true; box.classList.add("revealed"); }
        cv.addEventListener("pointerdown", (e) => { drawing = true; cv.setPointerCapture(e.pointerId); scratch(e); });
        cv.addEventListener("pointermove", scratch);
        cv.addEventListener("pointerup", () => { drawing = false; check(); });
        cv.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") reveal(); });
        window.addEventListener("resize", () => { if (!done) paint(); });
    }

    /* ---------- our story ---------- */
    const ST = S.story;
    $("#story-meta").innerHTML = ST.meta.map((m, i) => `<span class="${i === 0 ? "match" : i === 2 ? "tag" : ""}">${esc(m)}</span>`).join("");

    const ring = `<svg viewBox="0 0 40 40" class="ring-svg" aria-hidden="true"><circle cx="20" cy="25" r="10" fill="none" stroke="#c9a14a" stroke-width="2.6"/><path d="M14 13 L20 6 L26 13 L20 17 Z" fill="#eaf4fb" stroke="#a9c7da" stroke-width=".8"/></svg>`;

    function storyExtra(kind) {
        if (kind === "food") {
            return `<div class="tickets">${ST.restaurants.map((r, i) => `
                <div class="ticket rv" style="--r:${[-3, 2, -2, 3][i % 4]}deg"><small>Table for two</small><b>${esc(r.name)}</b><span>${esc(r.note)}</span></div>`).join("")}</div>`;
        }
        if (kind === "opposites") {
            const o = ST.opposites;
            return `<div class="opp rv">
                <div class="opp-row opp-head"><span>${esc(o.her)}</span><span>${esc(o.him)}</span></div>
                ${o.rows.map((r) => `<div class="opp-row"><span>${esc(r[0])}</span><span>${esc(r[1])}</span></div>`).join("")}
                <p class="opp-common-label">${esc(o.commonLabel)}</p>
                <p class="opp-common">${o.common.map((c) => esc(c).replace(/ /g, "&nbsp;")).join('<i aria-hidden="true">·</i>')}</p>
            </div>`;
        }
        if (kind === "book") {
            const b = ST.book;
            const p = b.pages;
            const leaves = [
                [`<div class="bk-cover"><b>${esc(b.cover)}</b><small>${esc(b.coverBy)}</small></div>`, p[0]],
                [p[1], p[2]],
                [p[3], p[4]],
            ];
            const page = (t) => (t.startsWith("<") ? t : `<div class="bk-page"><p>${lines(t)}</p></div>`);
            return `<div class="book-wrap rv">
                <div class="book" id="book" role="button" tabindex="0" aria-label="Turn the page">
                  <div class="bk-base"><div class="bk-page bk-final"><p class="bk-q">${lines(p[5])}</p>${ring}<p class="bk-answer">${esc(b.answer)}</p></div></div>
                  ${leaves.map((l) => `<div class="leaf"><div class="face front">${page(l[0])}</div><div class="face back">${page(l[1])}</div></div>`).join("")}
                </div>
                <div class="book-nav"><button type="button" id="bk-prev" aria-label="Previous page">‹</button><span>${esc(b.hint)}</span><button type="button" id="bk-next" aria-label="Next page">›</button></div>
            </div>`;
        }
        if (kind === "tennis") {
            let n = 0;
            return `<div class="tennis">
                <div class="balls rv" aria-label="${esc(ST.tennisBalls)}">${ST.tennisBalls.split(" ").map((w) => `<span class="ball-word">${w.split("").map((ch) => `<span class="ball" style="--n:${n++}">${esc(ch)}</span>`).join("")}</span>`).join("")}</div>
                <p class="tennis-answer rv">${esc(ST.tennisAnswer)}</p>
            </div>`;
        }
        return "";
    }

    $("#episode-list").innerHTML = ST.episodes.map((ep, i) => `
        <li class="ep">
          <div class="ep-row rv">
            <div class="ep-thumb">${A[ep.art] || ""}<span class="ep-play"><svg viewBox="0 0 12 14"><path d="M0 0 L12 7 L0 14Z" fill="#fff"/></svg></span></div>
            <div class="ep-info">
              <p class="ep-num">Episode ${i + 1}</p>
              <h4>${esc(ep.title)}</h4>
              <p>${lines(ep.text)}</p>
            </div>
          </div>
          ${ep.extra ? storyExtra(ep.extra) : ""}
        </li>`).join("");

    (function book() {
        const el = $("#book");
        if (!el) return;
        const leaves = $$(".leaf", el);
        let turned = 0;
        function show() {
            el.classList.toggle("open", turned > 0);
            el.classList.toggle("done", turned === leaves.length);
            leaves.forEach((l, i) => {
                l.classList.toggle("turned", i < turned);
                l.style.zIndex = i < turned ? i + 1 : leaves.length - i + 1;
            });
        }
        const next = () => { if (turned < leaves.length) { turned++; show(); } };
        const prev = () => { if (turned > 0) { turned--; show(); } };
        el.addEventListener("click", next);
        el.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") { e.preventDefault(); next(); }
            if (e.key === "ArrowLeft") prev();
        });
        $("#bk-next").addEventListener("click", next);
        $("#bk-prev").addEventListener("click", prev);
        show();
    })();

    /* ---------- Ivy's memo ---------- */
    $("#memo-body").innerHTML = S.ivy.body.map((p) => `<p>${esc(p)}</p>`).join("");
    $("#memo-list").innerHTML = events.map((e) => `
        <li>
          <a href="#ev-${e.id}">
            <span class="ml-date">${esc(fmt(at(e.date, e.start), { day: "2-digit", month: "short" }))}</span>
            <span class="ml-what"><b>${esc(e.short)}</b><em>${esc(S.ivy.notes[e.id] || "")}</em></span>
          </a>
        </li>`).join("");

    /* ---------- events ---------- */
    function decor(id) {
        if (id === "cocktail") {
            return `<div class="fan">${A.decoFan}</div>
                <span class="mirror mirror-l"></span><span class="mirror mirror-r"></span>
                <div class="bubbles">${Array.from({ length: 18 }, () => `<i style="--x:${rand(2, 98)}%;--s:${rand(3, 8)}px;--t:${rand(7, 14)}s;--dl:${rand(-14, 0)}s"></i>`).join("")}</div>`;
        }
        if (id === "mehndi") {
            return `<div class="rings">${Array.from({ length: 4 }, (_, i) => `<i style="--dl:${i * -1.5}s"></i>`).join("")}</div>
                <div class="eq">${Array.from({ length: 32 }, () => `<i style="--h:${rand(20, 100)}%;--t:${rand(0.7, 1.6)}s;--dl:${rand(-2, 0)}s"></i>`).join("")}</div>`;
        }
        if (id === "haldi") {
            const blob = (fill, x, y, s, r) => `<svg class="splash" style="--x:${x}%;--y:${y}%;--s:${s};--r:${r}deg" viewBox="0 0 100 100" aria-hidden="true"><path fill="${fill}" d="M52 6 C70 4 70 24 84 26 C98 28 96 48 90 58 C84 70 96 84 80 92 C64 100 56 86 44 92 C30 98 14 90 14 76 C14 62 2 56 6 42 C10 26 26 30 32 18 C38 8 44 7 52 6 Z"/></svg>`;
            return `<div class="sunburst"></div><span class="sun"></span>
                ${blob("#f2c230", 8, 70, 1.3, 20)}${blob("#b9a3e3", 82, 78, 1, -30)}${blob("#e8a91e", 88, 18, 0.7, 60)}${blob("#cdb8f0", 4, 22, 0.6, 0)}
                <div class="dots">${Array.from({ length: 26 }, (_, i) => `<i style="--x:${rand(0, 100)}%;--y:${rand(0, 100)}%;--c:${i % 2 ? "#7c5cc4" : "#e8a91e"};--s:${rand(4, 9)}px"></i>`).join("")}</div>`;
        }
        if (id === "wedding") {
            return `<div class="arch">${A.arch}</div><div class="colonnade-wrap">${A.colonnade}</div>`;
        }
        return "";
    }

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
              <p class="eyebrow rv">${esc(e.scheduleTitle)}</p>
              <p class="schedule-hint rv">${esc(e.scheduleHint)}</p>
              <ol class="schedule">${e.schedule.map((s) => `
                <li class="rv"><button type="button" aria-expanded="false">
                  <span class="s-time">${esc(s.time)}</span><span class="s-dot"></span><span class="s-name">${esc(s.name)}</span></button>
                  <p class="s-about" hidden>${esc(s.about)}</p></li>`).join("")}
              </ol>
            </div>` : "";
        return `
        <div class="passage">${passage ? `<p>${esc(passage)}</p>` : ""}</div>
        <section class="event ev-${e.id}" id="ev-${e.id}" data-theme="${e.id}">
          <div class="ev-decor" aria-hidden="true">${decor(e.id)}</div>
          <div class="ev-inner">
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
    let lastBg = "";
    function applyTheme(th) {
        Object.keys(th).forEach((k) => root.setProperty("--" + k, th[k]));
        if (th.bg !== lastBg) { themeMeta.content = th.bg; lastBg = th.bg; }
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
    applyTheme(THEMES.paper);

    /* ---------- envelope and music ---------- */
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
    $("#envelope").addEventListener("click", () => {
        if (opened) return;
        opened = true;
        if (S.musicUrl) { audio.src = S.musicUrl; musicBtn.hidden = false; setMusic(true); }
        $("#envelope").classList.add("open");
        setTimeout(() => document.body.classList.add("revealing"), 1700);
        setTimeout(() => {
            $("#envelope-screen").remove();
            document.body.classList.remove("locked", "revealing");
            document.body.classList.add("ready");
            $("#main").inert = false;
            scratchCard();
            blend();
            if (location.hash && $(location.hash)) $(location.hash).scrollIntoView();
        }, 2700);
    });

    /* ---------- reveal on scroll ---------- */
    const io = new IntersectionObserver((list) => list.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -10% 0px" });
    $$(".rv, .passage, .event, .memo").forEach((el) => io.observe(el));
})();
