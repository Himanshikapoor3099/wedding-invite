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
    const parentLines = [
        { name: S.couple.brideFull, p: S.invite.brideParents },
        { name: S.couple.groomFull, p: S.invite.groomParents },
    ];
    if (S.groomFirst) parentLines.reverse();
    $("#parents").innerHTML = parentLines.map((x, i) => `<p><b class="hero-write" style="--d:${0.7 + i * 1.1}s">${esc(x.name)}</b><span class="hero-in" style="--d:${1.4 + i * 1.1}s">${lines(x.p)}</span></p>`)
        .join('<i class="amp hero-in" style="--d:1.6s">&amp;</i>');

    /* ---------- countdown ---------- */
    const target = range(S.events[S.saveTheDate.countdownTo] || events[0]);
    const firstStart = range(events[0]).start;
    const lastEnd = range(events[events.length - 1]).end;
    $("#cd-label").textContent = S.events[S.saveTheDate.countdownTo] ? S.saveTheDate.countdownLabel : "until the celebrations begin";
    const bigDay = S.events[S.saveTheDate.countdownTo];
    $("#scratch-dates").innerHTML = bigDay
        ? lines(S.saveTheDate.dates)
        : esc(fmt(at(events[0].date, events[0].start), { day: "2-digit", month: "long", year: "numeric" })) + "<br>New Delhi";
    function tick() {
        const now = Date.now();
        if (now >= target.start.getTime()) {
            $("#cd-units").hidden = true;
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

    /* ---------- scratch card: the countdown only appears once the foil is gone ---------- */
    function scratchCard() {
        const box = $("#scratch");
        const cv = $("#scratch-foil");
        const ctx = cv.getContext("2d");
        let done = false, drawing = false, last = null;
        function paint() {
            const r = box.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            cv.width = r.width * dpr; cv.height = r.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const g = ctx.createLinearGradient(0, 0, r.width, r.height);
            g.addColorStop(0, "#a8802c"); g.addColorStop(0.42, "#ecd08a"); g.addColorStop(0.58, "#d8b25e"); g.addColorStop(1, "#9c7322");
            ctx.fillStyle = g; ctx.fillRect(0, 0, r.width, r.height);
            for (let i = 0; i < 220; i++) {
                ctx.fillStyle = `rgba(255,255,255,${0.05 + Math.random() * 0.3})`;
                ctx.fillRect(Math.random() * r.width, Math.random() * r.height, 1.2, 1.2);
            }
            ctx.strokeStyle = "rgba(255,255,255,.5)"; ctx.lineWidth = 1;
            ctx.strokeRect(9.5, 9.5, r.width - 19, r.height - 19);
            ctx.fillStyle = "#fffaf0"; ctx.font = "500 12px Jost, sans-serif"; ctx.textAlign = "center";
            ctx.fillText(S.saveTheDate.scratch.toUpperCase().split("").join(String.fromCharCode(8202, 8202)), r.width / 2, r.height / 2 + 4);
        }
        paint();
        const pos = (ev) => { const r = cv.getBoundingClientRect(); return [ev.clientX - r.left, ev.clientY - r.top]; };
        function line(a, b) {
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineWidth = 44; ctx.lineCap = "round";
            ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
            ctx.globalCompositeOperation = "source-over";
        }
        function cleared() {
            const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
            let c = 0, n = 0;
            for (let i = 3; i < d.length; i += 64) { n++; if (d[i] < 20) c++; }
            return n ? c / n : 0;
        }
        function reveal() {
            if (done) return;
            done = true;
            box.classList.add("revealed");
            $("#scratch-hint").classList.add("gone");
            confetti(box);
            setTimeout(() => $("#countdown").classList.add("visible"), 350);
        }
        cv.addEventListener("pointerdown", (e) => { if (done) return; drawing = true; cv.setPointerCapture(e.pointerId); last = pos(e); line(last, last); });
        cv.addEventListener("pointermove", (e) => { if (!drawing || done) return; const p = pos(e); line(last, p); last = p; });
        const end = () => { if (!drawing) return; drawing = false; if (cleared() > 0.45) reveal(); };
        cv.addEventListener("pointerup", end);
        cv.addEventListener("pointercancel", end);
        cv.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); reveal(); } });
        window.addEventListener("resize", () => { if (!done) paint(); });
    }

    // paper confetti bursting up from the card
    function confetti(origin, count = 80) {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const r = origin.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const colours = ["#e8c874", "#eba77a", "#f4b9c2", "#a9b78f", "#f6d6c2", "#c9a352", "#ffffff"];
        const layer = document.createElement("div");
        layer.className = "confetti";
        document.body.appendChild(layer);
        let longest = 0;
        for (let i = 0; i < count; i++) {
            const piece = document.createElement("span");
            const w = 5 + Math.random() * 4, dot = Math.random() < 0.25;
            Object.assign(piece.style, {
                left: cx + "px", top: cy + "px", width: w + "px", height: (dot ? w : w * 1.6) + "px",
                borderRadius: dot ? "50%" : "2px", background: colours[Math.floor(Math.random() * colours.length)],
            });
            layer.appendChild(piece);
            const a = (-90 + (Math.random() - 0.5) * 140) * Math.PI / 180;
            const sp = 160 + Math.random() * 260, dx = Math.cos(a) * sp, dy = Math.sin(a) * sp;
            const fall = 320 + Math.random() * 360, spin = (Math.random() < 0.5 ? -1 : 1) * (360 + Math.random() * 720);
            const duration = 2200 + Math.random() * 1400;
            longest = Math.max(longest, duration);
            piece.animate([
                { transform: "translate(-50%, -50%) rotate(0deg)", opacity: 1, easing: "cubic-bezier(.15, .8, .35, 1)" },
                { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${spin / 3}deg)`, opacity: 1, offset: 0.3, easing: "cubic-bezier(.5, 0, .9, .6)" },
                { transform: `translate(calc(-50% + ${dx * 1.4}px), calc(-50% + ${dy + fall}px)) rotate(${spin}deg)`, opacity: 0 },
            ], { duration, fill: "forwards" });
        }
        setTimeout(() => layer.remove(), longest + 200);
    }

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

    // Each scene is a painted backdrop with cut-out figures that move on it
    const SCENES = {
        cocktail: `<img class="fig fig-him" src="assets/art/cocktail-him.webp" alt="">
                   <img class="fig fig-her" src="assets/art/cocktail-her.webp" alt="">`,
        haldi: `<img class="fig fig-him" src="assets/art/haldi-him.webp" alt="">
                <span class="fig-her-wrap"><img class="fig fig-her" src="assets/art/haldi-her.webp" alt=""><i class="smudge"></i></span>`,
        wedding: `<span class="flame" aria-hidden="true"><i></i><i></i><i></i></span>
                  <img class="fig fig-pheras" src="assets/art/pheras.webp" alt="">
                  <span class="bells bells-r bells-sm" aria-hidden="true"></span>`,
    };

    $("#events").innerHTML = events.map((e) => {
        const d = at(e.date, e.start);
        const cal = calendar(e);
        const passage = S.passages["to" + e.id[0].toUpperCase() + e.id.slice(1)];
        const schedule = e.schedule ? `
            <div class="schedule-wrap rv">
              <p class="eyebrow">${esc(e.scheduleTitle)}</p>
              <ol class="day-list">${e.schedule.map((s) => `
                <li><span class="t-time">${esc(s.time)}</span><span class="t-name">${esc(s.name)}</span></li>`).join("")}
              </ol>
            </div>` : "";
        return `
        <div class="passage">${passage ? `<p>${esc(passage)}</p>` : ""}</div>
        <section class="event ev-${e.id}" id="ev-${e.id}" data-theme="${e.id}">
          <div class="ev-head">
            ${e.kicker ? `<p class="ev-kicker rv">${esc(e.kicker)}</p>` : ""}
            <h2 class="ev-title rv">${esc(e.title)}</h2>
            ${e.tagline ? `<p class="ev-tagline rv">${esc(e.tagline)}</p>` : ""}
          </div>
          <div class="ev-scene scene-${e.id}">
            <img class="scene-bg" src="assets/art/${e.id}-bg.jpg" alt="" loading="lazy">
            ${SCENES[e.id] || ""}
          </div>
          <div class="ev-details">
            <div class="date-block rv">
              <span class="db-side">${esc(fmt(d, { weekday: "long" }))}</span>
              <span class="db-mid"><small>${esc(fmt(d, { month: "long" }))}</small><b>${esc(fmt(d, { day: "2-digit" }))}</b></span>
              <span class="db-side">${esc(e.timeLabel)}</span>
            </div>
            <div class="venue rv">
              <p class="v-name">${esc(e.venue)}</p>
            </div>
            ${e.note ? `<p class="ev-note rv">${esc(e.note)}</p>` : ""}
            ${schedule}
            <div class="ev-actions rv">
              <a class="btn" href="${esc(mapsUrl(e))}" target="_blank" rel="noopener">Directions</a>
              <a class="btn" href="${esc(cal.g)}" target="_blank" rel="noopener">Google Calendar</a>
              <a class="btn" href="${cal.ics}" download="${e.id}.ics">Apple / Outlook</a>
            </div>
          </div>
        </section>`;
    }).join("");

    $$("[data-k-passage]").forEach((el) => {
        const t = S.passages[el.dataset.kPassage];
        if (t) el.innerHTML = `<p>${esc(t)}</p>`;
    });

    // paintings and monograms, now that every slot is on the page
    $$("[data-art]").forEach(artSlot);
    $$("[data-monogram]").forEach(monogram);

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

    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // After the door opens, a plain screen fades in and the crest grows in
    // its middle. It holds for a moment, then fades away to reveal the
    // invitation.
    async function showCrest() {
        const veil = document.createElement("div");
        veil.className = "crest-veil";
        document.body.appendChild(veil);
        await veil.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, easing: "ease", fill: "forwards" }).finished;
        const fly = document.createElement("div");
        fly.className = "crest-fly";
        fly.innerHTML = '<img src="assets/art/monogram.png" alt="">';
        document.body.appendChild(fly);
        const size = Math.min(window.innerWidth * 0.8, 380);
        Object.assign(fly.style, { width: size + "px", height: size + "px", left: (window.innerWidth - size) / 2 + "px", top: (window.innerHeight - size) / 2 + "px" });
        await fly.animate([
            { opacity: 0, transform: "scale(.3)" },
            { opacity: 1, transform: "scale(1.03)", offset: 0.8 },
            { opacity: 1, transform: "scale(1)" },
        ], { duration: 1800, easing: "cubic-bezier(.2, .8, .2, 1)", fill: "forwards" }).finished;
        await wait(2600);
        return { veil, fly };
    }
    async function hideCrest({ veil, fly }) {
        await Promise.all([
            fly.animate([{ opacity: 1, transform: "scale(1)" }, { opacity: 0, transform: "scale(1.08)" }], { duration: 1200, easing: "ease", fill: "forwards" }).finished,
            veil.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1400, delay: 300, easing: "ease", fill: "forwards" }).finished,
        ]);
        fly.remove();
        veil.remove();
    }

    let opened = false;
    $("#door").addEventListener("click", async () => {
        if (opened) return;
        opened = true;
        if (S.musicUrl) { audio.src = S.musicUrl; musicBtn.hidden = false; setMusic(true); }
        document.body.classList.add("door-open");
        const finish = () => {
            $("#door-screen") && $("#door-screen").remove();
            document.body.classList.remove("locked");
            $("#main").inert = false;
            window.scrollTo(0, 0);
            blend();
        };
        if (still) {
            finish();
            document.body.classList.add("ready");
            scratchCard();
            return;
        }
        await wait(2000);            // let the door swing fully open
        const crest = await showCrest();
        finish();
        document.body.classList.add("ready");
        await hideCrest(crest);
        scratchCard();
        if (location.hash && $(location.hash)) $(location.hash).scrollIntoView();
    });

    /* ---------- reveal on scroll ---------- */
    const io = new IntersectionObserver((list) => list.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -10% 0px" });
    $$(".rv, .passage, .event").forEach((el) => io.observe(el));
})();
