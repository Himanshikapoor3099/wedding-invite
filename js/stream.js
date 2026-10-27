/* The streaming-app version of the invitation. Uses the same js/content.js
   and the same paintings as the classic invitation. */
(function () {
    const S = window.SITE;
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    const lines = (s) => esc(s).replace(/\n/g, "<br>");
    const ART = (name) => `assets/art/${name}.jpg`;
    const TZ = S.timeZone;
    const events = Object.entries(S.events).map(([id, e]) => Object.assign({ id }, e));
    const chapters = S.story.chapters.concat([{ title: S.story.finale.title.replace(/…$/, ""), art: S.story.finale.art, text: S.story.finale.text }]);
    const wait = (ms) => new Promise((r) => setTimeout(r, ms));
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- dates ---------- */
    const at = (date, time) => new Date(`${date}T${time}:00${TZ.offset}`);
    function range(e) {
        const start = at(e.date, e.start);
        let end = at(e.date, e.end);
        if (end <= start) end = new Date(end.getTime() + 86400000);
        return { start, end };
    }
    const fmt = (d, o) => d.toLocaleDateString("en-GB", Object.assign({ timeZone: TZ.name }, o));
    const stamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
    const mapsUrl = (e) => e.mapUrl || "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(e.venue + ", " + e.address);
    function calendar(e) {
        const { start, end } = range(e);
        const title = `${e.title} · ${S.couple.bride} & ${S.couple.groom}`;
        const loc = `${e.venue}, ${e.address}`;
        const g = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(title)
            + "&dates=" + stamp(start) + "/" + stamp(end) + "&location=" + encodeURIComponent(loc);
        const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//HK Wedding//EN", "BEGIN:VEVENT", `UID:hk-${e.id}@wedding`,
            `DTSTAMP:${stamp(new Date())}`, `DTSTART:${stamp(start)}`, `DTEND:${stamp(end)}`, `SUMMARY:${title}`,
            `LOCATION:${loc.replace(/,/g, "\\,")}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");
        return { g, ics: URL.createObjectURL(new Blob([ics], { type: "text/calendar" })) };
    }

    /* ---------- profiles ---------- */
    const profiles = [];
    if (S.guest) profiles.push({ name: S.guest, colour: "#e50914", side: S.groomFirst ? "groom" : "bride" });
    profiles.push(
        { name: "Kapoor family", colour: "#d4a24c", side: "bride" },
        { name: "Sachdeva family", colour: "#3c7dd9", side: "groom" },
        { name: "Friends", colour: "#2f9e5a", side: S.groomFirst ? "groom" : "bride" },
        { name: "Ivy", colour: "#c98a5a", side: S.groomFirst ? "groom" : "bride", img: ART("ivy-face") },
    );
    $("#pf-grid").innerHTML = profiles.map((p, i) => `
        <button class="pf" type="button" data-i="${i}">
          <span class="pf-face" style="--c:${p.colour}">${p.img ? `<img src="${esc(p.img)}" alt="">` : `<b>${esc(p.name[0])}</b>`}</span>
          <span class="pf-name">${esc(p.name)}</span>
        </button>`).join("");

    /* ---------- hero ---------- */
    $("#hero-title").textContent = S.couple.hashtag.replace("#", "");
    $("#hero-art").innerHTML = `<img src="${ART("ch5-book")}" alt="">`;
    $("#hero-logline").textContent = "She scheduled his matches. He scheduled everything after. Two people who disagree on almost everything, except each other, are finally getting married. Starring " + S.couple.brideFull + " and " + S.couple.groomFull + ".";
    const firstStart = range(events[0]).start;
    function premiere() {
        const t = Math.floor((firstStart.getTime() - Date.now()) / 1000);
        if (t <= 0) { $("#premiere").textContent = "Now streaming live in New Delhi"; return; }
        const d = Math.floor(t / 86400), h = Math.floor(t / 3600) % 24, m = Math.floor(t / 60) % 60, s = t % 60;
        $("#premiere").innerHTML = `Season 2 premieres in <b>${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s</b>`;
    }
    premiere();
    setInterval(premiere, 1000);

    /* ---------- rows ---------- */
    $("#rail-episodes").innerHTML = chapters.map((c, i) => `
        <button class="card" type="button" data-ep="${i}">
          <span class="card-img"><img src="${ART(c.art)}" alt="" loading="lazy"><span class="card-num">${i + 1}</span></span>
          <span class="card-title">${esc(c.title)}</span>
          <span class="card-sub">S1 · E${i + 1}</span>
        </button>`).join("");

    $("#rail-events").innerHTML = events.map((e, i) => {
        const d = at(e.date, e.start);
        return `
        <button class="card card-tall" type="button" data-ev="${i}">
          <span class="card-img"><img src="${ART(e.art)}" alt="" loading="lazy">
            <span class="card-badge">${esc(fmt(d, { day: "2-digit", month: "short" }).toUpperCase())}</span></span>
          <span class="card-title">${esc(e.title)}</span>
          <span class="card-sub">S2 · E${i + 1} · ${esc(e.timeLabel)}</span>
        </button>`;
    }).join("");

    const cast = [
        { name: S.couple.brideFull, role: "The Bride", img: ART("ch1-fixture"), pos: "28% 40%" },
        { name: S.couple.groomFull, role: "The Groom", img: ART("ch4-poles"), pos: "78% 45%" },
        { name: "Ivy", role: "Chief Invitation Officer", img: ART("ivy-face"), pos: "50% 50%", plain: true },
        { name: "The Kapoors", role: "Executive Producers", mono: true },
        { name: "The Sachdevas", role: "Executive Producers", mono: true },
    ];
    $("#rail-cast").innerHTML = cast.map((c) => `
        <div class="cast">
          <span class="cast-face">${c.mono ? `<img src="assets/art/monogram.png" alt="" class="mono">` : `<img src="${esc(c.img)}" alt="" class="${c.plain ? "plain" : ""}" style="object-position:${c.pos}">`}</span>
          <span class="cast-name">${esc(c.name)}</span>
          <span class="cast-role">${esc(c.role)}</span>
        </div>`).join("");

    /* ---------- detail sheet ---------- */
    const sheet = $("#sheet");
    function openSheet(html) {
        $("#sh-body").innerHTML = html;
        sheet.hidden = false;
        requestAnimationFrame(() => sheet.classList.add("open"));
        document.body.classList.add("locked");
    }
    function closeSheet() {
        sheet.classList.remove("open");
        document.body.classList.remove("locked");
        setTimeout(() => { sheet.hidden = true; }, 300);
    }
    $("#sh-close").addEventListener("click", closeSheet);
    sheet.addEventListener("click", (e) => { if (e.target === sheet) closeSheet(); });

    function episodeSheet(i) {
        const c = chapters[i];
        const next = chapters[i + 1];
        let extra = "";
        if (c.balls) extra = `<p class="sh-balls">${c.balls.split("").map((ch) => ch === " " ? "<i></i>" : `<span>${esc(ch)}</span>`).join("")}</p>`;
        openSheet(`
          <div class="sh-art"><img src="${ART(c.art)}" alt=""></div>
          <div class="sh-text">
            <p class="sh-kicker">Season 1 · Episode ${i + 1}</p>
            <h3>${esc(c.title)}</h3>
            <p class="sh-meta"><b class="match">98% Match</b><span>2026</span><span class="tag">U/A</span></p>
            <p>${lines(c.text)}</p>
            ${c.surprise ? `<p class="sh-twist">${esc(c.surprise.after)}</p>` : ""}
            ${extra}
            ${next ? `<button class="nbtn nbtn-more sh-next" type="button" data-ep="${i + 1}">Next episode ›</button>`
                   : `<button class="nbtn nbtn-play sh-next" type="button" data-season2>Watch Season 2 ›</button>`}
          </div>`);
    }

    function eventSheet(i) {
        const e = events[i];
        const d = at(e.date, e.start);
        const cal = calendar(e);
        const schedule = e.schedule ? `
            <p class="sh-kicker">${esc(e.scheduleTitle)}</p>
            <ol class="sh-sched">${e.schedule.map((s) => `<li><span>${esc(s.time)}</span><b>${esc(s.name)}</b><em>${esc(s.about)}</em></li>`).join("")}</ol>` : "";
        openSheet(`
          <div class="sh-art sh-art-tall"><img src="${ART(e.art)}" alt=""></div>
          <div class="sh-text">
            <p class="sh-kicker">Season 2 · Episode ${i + 1} · ${esc(e.kicker)}</p>
            <h3>${esc(e.title)}</h3>
            <p class="sh-tagline">${esc(e.tagline)}</p>
            <p class="sh-when"><b>${esc(fmt(d, { weekday: "long", day: "numeric", month: "long" }))}</b> · ${esc(e.timeLabel)}</p>
            <p class="sh-venue"><b>${esc(e.venue)}</b><br>${esc(e.address)}</p>
            ${e.dressCode ? `<p class="sh-dress"><span>Dress code</span>${esc(e.dressCode)} ${e.swatches.map((c) => `<i style="background:${c}"></i>`).join("")}</p>` : ""}
            ${e.note ? `<p>${esc(e.note)}</p>` : ""}
            ${schedule}
            <div class="sh-btns">
              <a class="nbtn nbtn-play" href="${esc(cal.g)}" target="_blank" rel="noopener">🔔 Remind me</a>
              <a class="nbtn nbtn-more" href="${esc(mapsUrl(e))}" target="_blank" rel="noopener">Directions</a>
              <a class="nbtn nbtn-more" href="${cal.ics}" download="${e.id}.ics">Apple / Outlook</a>
            </div>
          </div>`);
    }

    document.addEventListener("click", (e) => {
        const ep = e.target.closest("[data-ep]");
        const ev = e.target.closest("[data-ev]");
        if (ep) episodeSheet(+ep.dataset.ep);
        else if (ev) eventSheet(+ev.dataset.ev);
        else if (e.target.closest("[data-season2]")) { closeSheet(); $("#coming").scrollIntoView({ behavior: "smooth" }); }
    });

    /* ---------- trailer: the story, chapter by chapter ---------- */
    const SLIDE_MS = 5200;
    const frames = [
        { kicker: "An HK Original", title: S.couple.hashtag.replace("#", ""), art: "ch1-fixture", text: "Based on a true story." },
        ...chapters.map((c, i) => ({ kicker: `Episode ${i + 1}`, title: c.title, art: c.art, text: c.text.split(/(?<=\.)\s/)[0] })),
        { kicker: "Season 2", title: "The Wedding", art: "ev-wedding", text: "28 November — 01 December 2026 · New Delhi" },
    ];
    $("#pl-bars").innerHTML = frames.map(() => "<i><b></b></i>").join("");
    $("#pl-frames").innerHTML = frames.map((f) => `
        <div class="pl-frame">
          <img src="${ART(f.art)}" alt="">
          <div class="pl-cap"><p class="pl-kicker">${esc(f.kicker)}</p><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div>
        </div>`).join("");
    let slide = -1, slideTimer = null;
    function showSlide(n) {
        if (n >= frames.length) return closePlayer(true);
        slide = Math.max(0, n);
        $$(".pl-frame").forEach((f, i) => f.classList.toggle("on", i === slide));
        $$("#pl-bars i").forEach((b, i) => {
            b.classList.toggle("done", i < slide);
            b.classList.toggle("run", i === slide);
            const bar = b.firstChild;
            bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = "";
        });
        clearTimeout(slideTimer);
        slideTimer = setTimeout(() => showSlide(slide + 1), SLIDE_MS);
    }
    function openPlayer() {
        const p = $("#player");
        p.hidden = false;
        document.body.classList.add("locked");
        requestAnimationFrame(() => p.classList.add("open"));
        showSlide(0);
    }
    function closePlayer(ended) {
        clearTimeout(slideTimer);
        const p = $("#player");
        p.classList.remove("open");
        document.body.classList.remove("locked");
        setTimeout(() => { p.hidden = true; }, 300);
        if (ended) $("#coming").scrollIntoView({ behavior: "smooth" });
    }
    $("#play-trailer").addEventListener("click", openPlayer);
    $("#pl-close").addEventListener("click", () => closePlayer(false));
    $("#pl-next").addEventListener("click", () => showSlide(slide + 1));
    $("#pl-prev").addEventListener("click", () => showSlide(slide - 1));
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") { if (!$("#player").hidden) closePlayer(false); if (!sheet.hidden) closeSheet(); }
        if (!$("#player").hidden && e.key === "ArrowRight") showSlide(slide + 1);
        if (!$("#player").hidden && e.key === "ArrowLeft") showSlide(slide - 1);
    });

    /* ---------- RSVP and credits ---------- */
    let contact = S.contacts.people[0];
    function rsvpHref() {
        if (S.rsvp.formUrl) {
            let url = S.rsvp.formUrl;
            if (S.rsvp.nameEntry && S.guest) url += (url.includes("?") ? "&" : "?") + encodeURIComponent(S.rsvp.nameEntry) + "=" + encodeURIComponent(S.guest);
            return url;
        }
        const msg = `Hello! RSVP for ${S.couple.bride} & ${S.couple.groom}'s wedding.\nName: ${S.guest || ""}\nNumber of guests: \nAttending: ${events.map((e) => e.short).join(", ")}`;
        return `https://wa.me/${contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
    }
    function setRsvp() { ["#rsvp-btn", "#rsvp-top"].forEach((s) => { $(s).href = rsvpHref(); }); }
    setRsvp();
    $("#rsvp-by").textContent = S.rsvp.by;
    $("#cr-families").textContent = S.closing.families;
    $("#cr-tag").textContent = S.couple.hashtag;
    $("#cr-contacts").innerHTML = S.contacts.people.map((p) => {
        const n = p.phone.replace(/\D/g, "");
        return `<li><b>${esc(p.name)}</b><small>${esc(p.role)}</small><a href="tel:+${n}">${esc(p.phone)}</a> · <a href="https://wa.me/${n}" target="_blank" rel="noopener">WhatsApp</a></li>`;
    }).join("");
    $("#classic-link").href = "index.html" + location.search;
    $("#share-btn").addEventListener("click", async () => {
        const url = location.href.split("#")[0];
        try {
            if (navigator.share) await navigator.share({ title: document.title, text: S.shareText, url });
            else { await navigator.clipboard.writeText(url); $("#share-btn").textContent = "Link copied"; }
        } catch (err) { /* share sheet closed */ }
    });

    /* ---------- music ---------- */
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

    /* ---------- start: pick a profile, play the sting, land on home ---------- */
    let started = false;
    $("#pf-grid").addEventListener("click", async (e) => {
        const btn = e.target.closest(".pf");
        if (!btn || started) return;
        started = true;
        const p = profiles[+btn.dataset.i];
        contact = S.contacts.people.find((c) => c.side === p.side) || contact;
        setRsvp();
        $("#tb-avatar").style.setProperty("--c", p.colour);
        $("#tb-avatar").innerHTML = p.img ? `<img src="${esc(p.img)}" alt="">` : esc(p.name[0]);
        $("#hero-hello").textContent = p.name === "Ivy" ? "Welcome back, Ivy. You're in this one." : `Welcome, ${p.name}. You're invited.`;
        if (S.musicUrl) { audio.src = S.musicUrl; musicBtn.hidden = false; setMusic(true); }
        btn.classList.add("picked");
        await wait(still ? 0 : 450);
        $("#profiles").classList.add("gone");
        if (!still) {
            const sting = $("#sting");
            sting.hidden = false;
            requestAnimationFrame(() => sting.classList.add("play"));
            await wait(2600);
            sting.classList.add("out");
            await wait(500);
            sting.remove();
        }
        $("#profiles").remove();
        document.body.classList.remove("locked");
        document.body.classList.add("ready");
        $("#home").inert = false;
    });
})();
