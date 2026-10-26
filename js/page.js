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

    /* ---------- dates ---------- */
    const at = (date, time) => new Date(`${date}T${time}:00${TZ.offset}`);
    function range(e) {
        const start = at(e.date, e.start);
        let end = at(e.date, e.end);
        if (end <= start) end = new Date(end.getTime() + 86400000);
        return { start, end };
    }
    const fmt = (d, opts) => d.toLocaleDateString("en-IN", Object.assign({ timeZone: TZ.name }, opts));
    const utcStamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const mapsUrl = (e) => e.mapUrl || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(e.venue + ", " + e.address);

    /* ---------- simple text fields ---------- */
    $$("[data-k]").forEach((el) => {
        const v = get(el.dataset.k);
        if (v) el.innerHTML = lines(v);
        else el.hidden = true;
    });
    $$("[data-src]").forEach((el) => { el.src = get(el.dataset.src); });
    $$("[data-monogram]").forEach((el) => { el.innerHTML = A.monogram(...S.couple.initials); });
    $$("[data-initials]").forEach((el) => { el.textContent = S.couple.initials.join(""); });
    document.title = `${S.couple.bride} & ${S.couple.groom} · Wedding Invitation`;

    if (S.groomFirst) {
        const n = $$(".env-names span");
        [n[0].textContent, n[1].textContent] = [n[1].textContent, n[0].textContent];
        const sn = $$(".signoff-names span");
        [sn[0].textContent, sn[1].textContent] = [sn[1].textContent, sn[0].textContent];
    }

    /* ---------- opening ---------- */
    $("#blessings").innerHTML = S.hero.blessings.map((b, i) => `
        <div class="blessing hero-in" style="--d:${0.2 + i * 0.25}s">
          <span class="bl-symbol" lang="${b.lang}">${esc(b.symbol)}</span>
          <span class="bl-line" lang="${b.lang}">${esc(b.line)}</span>
        </div>`).join('<span class="bl-dot hero-in" style="--d:.35s">✦</span>');

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
    const target = S.events[S.saveTheDate.countdownTo] ? range(Object.assign({}, S.events[S.saveTheDate.countdownTo])) : range(events[0]);
    const first = range(events[0]).start;
    const last = range(events[events.length - 1]).end;
    const sameAll = Object.keys(S.events).length === 4;
    $("#scratch-dates").innerHTML = sameAll
        ? esc(S.saveTheDate.dates)
        : events.map((e) => esc(fmt(at(e.date, e.start), { day: "2-digit", month: "short", year: "numeric" }))).join("<br>");
    $("#cd-label").textContent = S.events[S.saveTheDate.countdownTo] ? S.saveTheDate.countdownLabel : "until the celebrations begin";

    function tick() {
        const now = Date.now();
        const cd = $("#countdown");
        if (now >= last.getTime() || now >= target.start.getTime()) {
            cd.hidden = true;
            $("#cd-label").textContent = now >= last.getTime() ? S.saveTheDate.after : S.saveTheDate.during;
            return;
        }
        if (now >= first.getTime()) $("#cd-label").textContent = S.saveTheDate.during;
        let t = Math.floor((target.start.getTime() - now) / 1000);
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
            g.addColorStop(0, "#b8892f"); g.addColorStop(0.45, "#f3d98b"); g.addColorStop(0.55, "#e2bd62"); g.addColorStop(1, "#a5791f");
            ctx.fillStyle = g; ctx.fillRect(0, 0, r.width, r.height);
            for (let i = 0; i < 260; i++) {
                ctx.fillStyle = `rgba(255,255,255,${rand(0.05, 0.35)})`;
                ctx.fillRect(rand(0, r.width), rand(0, r.height), 1.2, 1.2);
            }
            ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.setLineDash([4, 4]);
            ctx.strokeRect(10, 10, r.width - 20, r.height - 20);
            ctx.setLineDash([]);
            ctx.fillStyle = "#fffaf0"; ctx.font = "500 14px Jost, sans-serif"; ctx.textAlign = "center";
            ctx.fillText(S.saveTheDate.scratch.toUpperCase().split("").join(String.fromCharCode(8202)), r.width / 2, r.height / 2 + 5);
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
    $("#story-meta").innerHTML = ST.meta.map((m, i) => `<span class="${i === 0 ? "match" : i === 2 || i === 4 ? "tag" : ""}">${esc(m)}</span>`).join("");

    function storyExtra(kind) {
        if (kind === "food") {
            return `<div class="tickets">${ST.restaurants.map((r, i) => `
                <div class="ticket rv" style="--r:${[-4, 3, -2, 4][i % 4]}deg"><small>Table for two</small><b>${esc(r)}</b><span>★★★★★</span></div>`).join("")}</div>`;
        }
        if (kind === "opposites") {
            const o = ST.opposites;
            return `<div class="opp rv">
                <div class="opp-head"><span>${esc(o.her)}</span><span class="vs">vs</span><span>${esc(o.him)}</span></div>
                ${o.rows.map((r) => `<div class="opp-row"><span class="opp-l"><i>${r[0]}</i>${esc(r[1])}</span><span class="opp-mid">⇄</span><span class="opp-r">${esc(r[2])}<i>${r[3]}</i></span></div>`).join("")}
                <p class="opp-common-label">${esc(o.commonLabel)}</p>
                <div class="opp-common">${o.common.map((c) => `<span>${esc(c)}</span>`).join("")}</div>
            </div>`;
        }
        if (kind === "book") {
            const b = ST.book;
            const p = b.pages;
            // leaves: [cover | p0], [p1 | p2], [p3 | p4]; p5 (the question) lies underneath
            const leaves = [
                [`<div class="bk-cover"><span class="bk-heart">♥</span><b>${esc(b.cover)}</b><small>${esc(b.coverBy)}</small></div>`, p[0]],
                [p[1], p[2]],
                [p[3], p[4]],
            ];
            const page = (t) => (t.startsWith("<") ? t : `<div class="bk-page"><p>${lines(t)}</p></div>`);
            return `<div class="book-wrap rv">
                <div class="book" id="book" role="button" tabindex="0" aria-label="Turn the page">
                  <div class="bk-base"><div class="bk-page bk-final"><p class="bk-q">${esc(p[5])}</p>${A.ring}<div class="bk-answer"><span class="yes">Yes! 💍</span></div></div></div>
                  ${leaves.map((l, i) => `<div class="leaf" style="--i:${i}"><div class="face front">${page(l[0])}</div><div class="face back">${page(l[1])}</div></div>`).join("")}
                </div>
                <div class="book-nav"><button type="button" id="bk-prev" aria-label="Previous page">‹</button><span>${esc(b.hint)}</span><button type="button" id="bk-next" aria-label="Next page">›</button></div>
            </div>`;
        }
        if (kind === "tennis") {
            const words = ST.tennisBalls.split(" ");
            let n = 0;
            return `<div class="tennis">
                <img class="tennis-photo rv" src="${esc(ST.tennisPhoto)}" alt="Himanshi proposing to Karan on a tennis court" loading="lazy">
                <div class="balls rv" aria-label="${esc(ST.tennisBalls)}">${words.map((w) => `<span class="ball-word">${w.split("").map((ch) => `<span class="ball" style="--n:${n++}">${esc(ch)}</span>`).join("")}</span>`).join("")}</div>
            </div>`;
        }
        return "";
    }

    $("#episode-list").innerHTML = ST.episodes.map((ep, i) => `
        <li class="ep">
          <div class="ep-row rv">
            <div class="ep-thumb">
              ${ep.image ? `<img src="${esc(ep.image)}" alt="" loading="lazy">` : A[ep.art] || ""}
              <span class="ep-play">▶</span>
            </div>
            <div class="ep-info">
              <p class="ep-num">Episode ${i + 1}</p>
              <h4>${esc(ep.title)}</h4>
              <p>${lines(ep.text)}</p>
            </div>
          </div>
          ${ep.extra ? storyExtra(ep.extra) : ""}
        </li>`).join("");

    function book() {
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
        el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " " || e.key === "ArrowRight") { e.preventDefault(); next(); } if (e.key === "ArrowLeft") prev(); });
        $("#bk-next").addEventListener("click", next);
        $("#bk-prev").addEventListener("click", prev);
        show();
    }
    book();

    /* ---------- Ivy ---------- */
    const ivyPic = $("#ivy-pic");
    const ivyImg = new Image();
    ivyImg.alt = "Ivy";
    ivyImg.onload = () => { ivyPic.innerHTML = ""; ivyPic.appendChild(ivyImg); ivyPic.classList.add("photo"); };
    ivyPic.innerHTML = A.ivy;
    if (S.ivy.photo) ivyImg.src = S.ivy.photo;
    $("#ivy-gallery").innerHTML = (S.ivy.gallery || []).map((g, i) => `
        <figure class="polaroid rv" style="--r:${[-5, 4, -3, 5][i % 4]}deg">
          <img src="${esc(g.photo)}" alt="Ivy" loading="lazy"><figcaption>${esc(g.caption)}</figcaption>
        </figure>`).join("");
    $("#ivy-list").innerHTML = events.map((e) => `
        <li><a href="#ev-${e.id}"><span class="paw">🐾</span><b>${esc(e.short)}</b><span>${esc(fmt(at(e.date, e.start), { day: "2-digit", month: "long", year: "numeric" }))}</span></a></li>`).join("");

    /* ---------- events ---------- */
    function decor(id) {
        if (id === "cocktail") {
            const balls = [[12, 30, 15], [28, 60, 19], [72, 46, 17], [88, 26, 14]];
            return `<div class="beams"><span></span><span></span><span></span></div>
                ${balls.map(([x, len, s], i) => `<span class="disco" style="--x:${x}%;--len:${len}px;--s:${s}vw;--dl:${-i * 1.3}s"></span>`).join("")}
                <div class="glitter">${Array.from({ length: 36 }, () => `<i style="--x:${rand(0, 100)}%;--y:${rand(0, 100)}%;--t:${rand(1.4, 3.6)}s;--dl:${rand(-4, 0)}s"></i>`).join("")}</div>`;
        }
        if (id === "mehndi") {
            const colours = ["#ffb703", "#ff6fa1", "#8ce99a", "#ffd166", "#f78c6b", "#c3a6ff"];
            return `<div class="lights">${Array.from({ length: 14 }, (_, i) => `<i style="--c:${colours[i % colours.length]};--dl:${rand(0, 2)}s"></i>`).join("")}</div>
                <div class="notes">${Array.from({ length: 10 }, (_, i) => `<i style="--x:${rand(4, 96)}%;--t:${rand(7, 12)}s;--dl:${rand(-12, 0)}s">${"♪♫♬♩"[i % 4]}</i>`).join("")}</div>`;
        }
        if (id === "haldi") {
            return `<span class="sun"></span>
                <div class="genda">${Array.from({ length: 9 }, (_, i) => `<i style="--len:${[70, 110, 90, 130, 80, 120, 95, 115, 75][i]}px"></i>`).join("")}</div>
                <div class="flowers">${Array.from({ length: 22 }, (_, i) => `<i class="${i % 2 ? "lav" : "yel"}" style="--x:${rand(0, 100)}%;--t:${rand(8, 15)}s;--dl:${rand(-15, 0)}s;--s:${rand(0.6, 1.2)}"></i>`).join("")}</div>`;
        }
        if (id === "wedding") {
            return `<div class="arch">${A.arch}</div>`;
        }
        return "";
    }

    function calendarLinks(e) {
        const { start, end } = range(e);
        const title = `${e.title} · ${S.couple.bride} & ${S.couple.groom}`;
        const loc = `${e.venue}, ${e.address}`;
        const g = "https://calendar.google.com/calendar/render?action=TEMPLATE"
            + "&text=" + encodeURIComponent(title)
            + "&dates=" + utcStamp(start) + "/" + utcStamp(end)
            + "&location=" + encodeURIComponent(loc)
            + "&details=" + encodeURIComponent(location.href.split("#")[0]);
        return { g, ics: { title, loc, start, end } };
    }
    function icsFile(list) {
        const body = list.map((x, i) => [
            "BEGIN:VEVENT", `UID:hk-${i}-${utcStamp(x.start)}@wedding`, `DTSTAMP:${utcStamp(new Date())}`,
            `DTSTART:${utcStamp(x.start)}`, `DTEND:${utcStamp(x.end)}`,
            `SUMMARY:${x.title}`, `LOCATION:${x.loc.replace(/,/g, "\\,")}`, "END:VEVENT"].join("\r\n")).join("\r\n");
        const text = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//HK Wedding//EN\r\n${body}\r\nEND:VCALENDAR`;
        return URL.createObjectURL(new Blob([text], { type: "text/calendar" }));
    }

    $("#events").innerHTML = events.map((e) => {
        const d = at(e.date, e.start);
        const cal = calendarLinks(e);
        e._cal = cal;
        const schedule = e.schedule ? `
            <div class="schedule-wrap">
              <p class="eyebrow rv">${esc(e.scheduleTitle)}</p>
              <p class="schedule-hint rv">${esc(e.scheduleHint)}</p>
              <ol class="schedule">${e.schedule.map((s, i) => `
                <li class="rv"><button type="button" aria-expanded="false" data-i="${i}">
                  <span class="s-time">${esc(s.time)}</span><span class="s-dot"></span><span class="s-name">${esc(s.name)}</span></button>
                  <p class="s-about" hidden>${esc(s.about)}</p></li>`).join("")}
              </ol>
            </div>` : "";
        return `
        <section class="event ev-${e.id}" id="ev-${e.id}">
          <div class="ev-decor" aria-hidden="true">${decor(e.id)}</div>
          <div class="ev-inner">
            ${e.kicker ? `<p class="ev-kicker rv">${esc(e.kicker)}</p>` : ""}
            <h2 class="ev-title rv">${esc(e.title)}</h2>
            <p class="ev-tagline rv">${esc(e.tagline)}</p>
            <div class="date-block rv">
              <span class="db-side">${esc(fmt(d, { weekday: "long" }))}</span>
              <span class="db-mid"><small>${esc(fmt(d, { month: "long" }))}</small><b>${esc(fmt(d, { day: "2-digit" }))}</b><small>${esc(fmt(d, { year: "numeric" }))}</small></span>
              <span class="db-side">${esc(e.timeLabel)}</span>
            </div>
            <div class="venue rv">
              <p class="v-name">${esc(e.venue)}</p>
              <p class="v-addr">${esc(e.address)}</p>
            </div>
            ${e.dressCode ? `<div class="dress rv"><span class="dress-label">Dress code</span><span class="dress-text">${esc(e.dressCode)}</span>
                <span class="swatches">${e.swatches.map((c) => `<i style="background:${c}"></i>`).join("")}</span></div>` : ""}
            ${e.note ? `<p class="ev-note rv">${esc(e.note)}</p>` : ""}
            ${schedule}
            <div class="ev-actions rv">
              <a class="btn" href="${esc(mapsUrl(e))}" target="_blank" rel="noopener">📍 Directions</a>
              <a class="btn" href="${esc(cal.g)}" target="_blank" rel="noopener">📅 Add to calendar</a>
              <a class="btn btn-link" data-ics="${e.id}" href="#">Apple / Outlook</a>
            </div>
          </div>
        </section>`;
    }).join("");

    $$("[data-ics]").forEach((a) => {
        const e = events.find((x) => x.id === a.dataset.ics);
        a.href = icsFile([e._cal.ics]);
        a.download = `${e.id}.ics`;
    });

    $$(".schedule button").forEach((b) => b.addEventListener("click", () => {
        const about = b.nextElementSibling;
        const open = b.getAttribute("aria-expanded") === "true";
        $$(".schedule button").forEach((x) => { x.setAttribute("aria-expanded", "false"); x.nextElementSibling.hidden = true; });
        if (!open) { b.setAttribute("aria-expanded", "true"); about.hidden = false; }
    }));

    /* ---------- RSVP ---------- */
    const contact = S.contacts.people[0];
    const rsvpBtn = $("#rsvp-btn");
    if (S.rsvp.formUrl) {
        let url = S.rsvp.formUrl;
        if (S.rsvp.nameEntry && S.guest) url += (url.includes("?") ? "&" : "?") + encodeURIComponent(S.rsvp.nameEntry) + "=" + encodeURIComponent(S.guest);
        rsvpBtn.href = url;
    } else if (contact) {
        const msg = `Hi! RSVP for ${S.couple.bride} & ${S.couple.groom}'s wedding 💌\nName: ${S.guest || ""}\nNumber of guests: \nAttending: ${events.map((e) => e.short).join(", ")}`;
        rsvpBtn.href = `https://wa.me/${contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
    }

    /* ---------- families & contacts ---------- */
    $("#family-sides").innerHTML = S.family.sides.map((s) => `
        <div class="side rv">
          <p class="side-title">${esc(s.title)}</p>
          <p class="side-family">${esc(s.family)}</p>
          ${s.names.length ? `<ul>${s.names.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
        </div>`).join('<span class="side-gem" aria-hidden="true">✦</span>');
    $("#contact-list").innerHTML = S.contacts.people.map((p) => {
        const num = p.phone.replace(/\D/g, "");
        return `<li><b>${esc(p.name)}</b><small>${esc(p.role)}</small>
            <span class="c-links"><a href="tel:+${num}">📞 ${esc(p.phone)}</a><a href="https://wa.me/${num}" target="_blank" rel="noopener">WhatsApp</a></span></li>`;
    }).join("");

    $("#share-btn").addEventListener("click", async () => {
        const url = location.href.split("#")[0];
        try {
            if (navigator.share) await navigator.share({ title: document.title, text: S.shareText, url });
            else { await navigator.clipboard.writeText(url); $("#share-btn").textContent = "Link copied ✓"; }
        } catch (err) { /* share sheet closed */ }
    });

    /* ---------- envelope ---------- */
    const petals = $("#env-petals");
    petals.innerHTML = Array.from({ length: 16 }, () => `<i style="--x:${rand(0, 100)}%;--t:${rand(7, 13)}s;--dl:${rand(-13, 0)}s;--c:${["#f2a541", "#f4b9c2", "#b9a3e3", "#e8546a"][Math.floor(rand(0, 4))]}"></i>`).join("");

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
    function openInvite() {
        if (opened) return;
        opened = true;
        if (S.musicUrl) {
            audio.src = S.musicUrl;
            musicBtn.hidden = false;
            setMusic(true);
        }
        $("#envelope").classList.add("open");
        setTimeout(() => document.body.classList.add("revealing"), 1500);
        setTimeout(() => {
            $("#envelope-screen").remove();
            document.body.classList.remove("locked", "revealing");
            document.body.classList.add("ready");
            $("#main").inert = false;
            scratchCard();
            if (location.hash && $(location.hash)) $(location.hash).scrollIntoView();
        }, 2600);
    }
    $("#envelope").addEventListener("click", openInvite);

    /* ---------- gentle reveal while scrolling ---------- */
    const io = new IntersectionObserver((list) => list.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    $$(".rv").forEach((el) => io.observe(el));
})();
