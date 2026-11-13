/* ==========================================================================
   SITE CONTENT: every name, date, line of text and link.
   Edit the values on the right of each colon and keep the quotes and commas.
     • Leave a text as "" to hide it.
     • Use \n inside a text to start a new line.
   Paintings live in assets/art/ (see ARTWORK-BRIEF.md for the names). Until
   a painting exists, a labelled placeholder shows in its place.
   ========================================================================== */
window.SITE = {

    couple: {
        bride: "Himanshi",
        brideFull: "Himanshi Kapoor",
        groom: "Karan",
        groomFull: "Karan Sachdeva",
        initials: ["H", "K"],
        hashtag: "#Karan-Mani-Fested",
    },

    /* ---------- The front door ------------------------------------------ */
    door: {
        pretext: "You're invited",
        hint: "Knock, knock. Tap to open",
    },

    /* ---------- Behind the door: Ivy delivers the invitation ------------- */
    invite: {
        delivery: "Ivy has a special delivery for you",
        blessings: [
            { line: "॥ श्री गणेशाय नमः ॥", lang: "hi" },
            { line: "॥ ੴ ਵਾਹਿਗੁਰੂ ॥", lang: "pa" },
        ],
        together: "Together with their families",
        inviteLine: "invite you to celebrate their wedding",
        brideParents: "Daughter of Mrs. Pramila & Mr. Gulshan Kapoor\nand Mrs. Chanchal & Mr. Praveen Kapoor",
        groomParents: "Son of Mrs. Meenu & Mr. Gulshan Sachdeva",
        request: "request your gracious presence\nat the celebration of their marriage",
        dates: "28 November — 01 December 2026",
        city: "New Delhi",
        ivyNote: "Ivy insisted on delivering this one herself.\nShe also insists you come.",
    },

    saveTheDate: {
        label: "Save the Date",
        dates: "01 December 2026\nNew Delhi",
        scratch: "Scratch gently",
        hint: "",
        countdownTo: "wedding",
        countdownLabel: "until the beginning of the most beautiful chapter",
        during: "The celebrations are underway.",
        after: "Thank you for celebrating with us.",
    },

    /* The lines shown between sections while the colours change */
    passages: {
        toStory: "But first, a little look at how it all began.",
        toCocktail: "Let the celebrations begin.",
        toMehndi: "Next, an evening of henna.",
        toHaldi: "After that, things turn yellow.",
        toWedding: "And then, the D-Day.",
    },

    /* ---------- Our story: a storybook ----------------------------------- */
    story: {
        title: "#Karan-Mani-Fested",
        subtitle: "Our story, in six chapters",
        coverBy: "by Himanshi & Karan",
        openHint: "Tap to open the book",
        turnHint: "Swipe or tap the arrows to turn the page",
        chapters: [
            {
                title: "The Fixture",
                art: "ch1-fixture",
                text: "He was the captain of a football team, and she was running the tournament. It started with match schedules and \"good luck today\" texts, and somewhere along the way, the conversations drifted to flirting.",
            },
            {
                title: "Naraina Metro",
                art: "ch2-metro",
                text: "For their first date, he came to pick her up at Naraina Metro. Years later, he still picks her up from the very same spot.",
            },
            {
                title: "A Taste of Delhi",
                art: "ch3-food",
                text: "Then came the long drives, the late-night talks and a lot of eating out. Burma Burma, Galaxy Pizza, Yum Yum Cha… one favourite at a time, they fell in love.",
            },
            {
                title: "Poles Apart",
                art: "ch4-poles",
                text: "He loves movies, she'd pick a book. He's coffee, she's chai. He dreams of beaches, she dreams of mountains. Total opposites, and somehow it just works.",
            },
            {
                title: "Between the Pages",
                art: "ch5-book",
                text: "He has always loved giving her books, so of course there was one on the big day. He got down on one knee, and the book held the question.",
                surprise: { wrap: "Open for a surprise", card: "", after: "She said yes." },
            },
            {
                title: "Game, Set, Match",
                art: "ch6-tennis",
                text: "The tennis court is his happy place, so that's where she asked him, with tennis balls spelling out the words. Two yeses later, here we are.",
                balls: "WILL YOU MARRY ME?",
            },
        ],
        finale: {
            art: "finale",
            title: "To be continued…",
            text: "From fixing match schedules to fixing a wedding date.\nTo a lifetime of love.",
        },
    },

    timeZone: { offset: "+05:30", name: "Asia/Kolkata" },

    /* ---------- The events, in order -------------------------------------
       date "YYYY-MM-DD", start/end 24-hour "HH:MM" (an end earlier than the
       start means after midnight). mapUrl opens the venue in Google Maps. */
    events: {
        cocktail: {
            art: "ev-cocktail",
            kicker: "",
            short: "Sagan & Cocktails",
            title: "Sagan & Cocktails",
            tagline: "",
            date: "2026-11-28", start: "19:00", end: "23:30",
            timeLabel: "7 pm onwards",
            venue: "ClubXO",
            address: "Site 2, Shivaji Place, Shivaji Enclave, Raja Garden, New Delhi 110027",
            mapUrl: "https://share.google/Hy4zNm8MEn87sH9yP",
            dressCode: "Blue and silver",
            swatches: ["#8fa9cf", "#c9d1dc"],
            note: "Blessings first, then drinks and music. Wear something that sparkles.",
        },
        haldi: {
            art: "ev-haldi",
            kicker: "",
            short: "Haldi",
            title: "Haldi",
            tagline: "",
            date: "2026-11-30", start: "11:00", end: "15:00",
            timeLabel: "11 am onwards",
            venue: "Pankh Punjabi Bagh Club",
            address: "Ring Road, near Mahanvir Nursing Home, West Punjabi Bagh, Punjabi Bagh, New Delhi 110026",
            mapUrl: "https://share.google/j9eCTfdyrUy5IeD31",
            dressCode: "Lavender and yellow",
            swatches: ["#b9a3e3", "#f6cf3e"],
            note: "Wear something you don't mind getting stained.",
        },
        wedding: {
            art: "ev-wedding",
            kicker: "",
            short: "The Wedding",
            title: "The Wedding",
            tagline: "",
            date: "2026-12-01", start: "11:00", end: "16:00",
            timeLabel: "11 am — 4 pm",
            venue: "Ambria Pushpanjali",
            address: "F-20, Dwarka Link Road, Samalka, New Delhi 110061",
            mapUrl: "https://share.google/MnzBjltmZXg6iUMne",
            dressCode: "Beige and cherry red",
            swatches: ["#e8d8bf", "#9b111e"],
            note: "Please come early for the baraat.",
            scheduleTitle: "Order of the day",
            scheduleHint: "",
            schedule: [
                { time: "9:00 am", name: "Sehrabandi & Ghudchadi", about: "The groom's family ties on his sehra, and he mounts the ghodi for the journey ahead." },
                { time: "10:00 am", name: "Baraat", about: "The groom arrives with family and friends in a procession of dhol, dancing and no small amount of noise." },
                { time: "11:00 am", name: "Milni", about: "The elders of both families meet and embrace. Two families become one." },
                { time: "12:00 pm", name: "Varmala", about: "Garlands are exchanged, and the bride and groom choose each other in front of everyone they love." },
                { time: "1:00 pm", name: "Phere", about: "Around the sacred fire, the couple take their vows, one round at a time." },
                { time: "2:00 pm", name: "Lunch", about: "A long table, good food and everyone together." },
                { time: "4:00 pm", name: "Vidai", about: "A tender farewell as the bride leaves her parents' home, carried by everyone's blessings." },
            ],
        },
    },

    /* ---------- Events shown only in some versions ----------------------
       A version page (for example bride-complete/index.html) names the
       version it is; "versions" below says which extra events it adds,
       which events it leaves out, and the dates it spans. */
    extraEvents: {
        mehndi: {
            kicker: "",
            short: "Mehndi, Music & Masti",
            title: "Mehndi, Music & Masti",
            tagline: "",
            date: "2026-11-29", start: "20:00", end: "23:59",
            timeLabel: "8 pm onwards",
            venue: "Chatoreee Restaurant",
            address: "Shop No. 7, AU Block, Ranikhet, Pitampura, Delhi 110034",
            mapUrl: "",
            note: "Good food, great songs and a lot of fun.",
        },
    },
    versions: {
        "bride-complete": { events: ["mehndi"] },
        "bride-no-cocktail": { events: ["mehndi"], hide: ["cocktail"], dates: "29 Nov — 01 Dec 2026" },
        "bride-wedding": { hide: ["cocktail", "haldi"], dates: "01 Dec 2026" },
        // groom side: groom's family first, the children at the door, the cocktail called "Sangeet"
        "groom-cocktail": { groom: true, hide: ["haldi"] },
        "groom-complete": { groom: true },
        "groom-wedding": { groom: true, hide: ["cocktail", "haldi"], dates: "01 Dec 2026" },
    },

    /* ---------- What changes on the groom-side invites ----------------- */
    groomSide: {
        cocktailTitle: "Cocktails & Thumkas",
        chapters: [
            { title: "The Fixture", art: "ch1-fixture-groom", text: "He captained the college team.\nShe managed the football tournament.\nAnd that's how it all began." },
            { title: "Meeting", text: "For their first meeting, he came to pick her up at Naraina Metro. Years later, he still picks her up from the very same spot." },
            { text: "Lots of going out. From their first conversations to countless food trails across Delhi, they discovered that everything tastes better together." },
        ],
    },

    rsvp: {
        title: "Kindly reply",
        text: "The guest list is long; the dance floor is longer. Let us know you're coming, and to which celebrations.",
        by: "Kindly reply by 10 November 2026",
        button: "RSVP",
        formUrl: "",
        nameEntry: "",
    },

    family: {
        label: "Hosted with love by",
        sides: [
            { side: "bride", title: "", family: "The Kapoors", names: [] },
            { side: "groom", title: "", family: "The Sachdevas", names: [] },
        ],
    },
    contacts: {
        title: "Questions? Call us",
        people: [
            { side: "bride", name: "Urvashi Kapoor", role: "Bride's family", phone: "+91 92107 08587" },
            { side: "groom", name: "Gulshan Sachdeva", role: "Groom's family", phone: "+91 98111 38797" },
        ],
    },

    /* ---------- A handwritten note from Nivi, the bride's nephew ---------- */
    nivi: {
        label: "A little note from Nivi",
        note: "My Masi is getting married!\nPlease come, I'm saving you a dance.",
        sign: "Love, Nivi",
        role: "",
    },

    closing: {
        signoff: "",
        families: "",
        line: "See you there.",
    },

    shareText: "You're invited to the wedding of Himanshi & Karan · 28 Nov — 01 Dec 2026 · New Delhi",
    musicUrl: "assets/audio/music.mp3?v=2",
};

/* ---------- Changes made by the link --------------------------------------
   #bride-complete          → that version of the invite (see "versions");
                              ?invite=bride-complete does the same
   ?to=Sharma%20Family      → "Dear Sharma Family" on the door
   ?side=groom              → groom's name and family first, groom's contact for RSVP
   ?events=haldi,wedding    → only those celebrations
   (links.html makes these links for you) */
(function () {
    const S = window.SITE;
    const q = new URLSearchParams(window.location.search || "");

    const to = (q.get("to") || "").trim().slice(0, 60);
    S.guest = to;
    if (to) S.door.pretext = "Dear " + to;

    // version pages add their extra events, kept in date order
    // a version is named by its folder page, by ?invite= or by #name on the main page.
    // The #name form keeps WhatsApp's saved preview of the main link.
    const hash = (window.location.hash || "").slice(1);
    const version = S.versions[window.INVITE_VERSION || q.get("invite") || hash];
    if (version) {
        (version.events || []).forEach((id) => { S.events[id] = S.extraEvents[id]; });
        (version.hide || []).forEach((id) => { delete S.events[id]; });
        if (version.dates) S.shareText = S.shareText.replace("28 Nov — 01 Dec 2026", version.dates);
        const sorted = Object.entries(S.events).sort((a, b) => (a[1].date + a[1].start).localeCompare(b[1].date + b[1].start));
        S.events = Object.fromEntries(sorted);
    }

    if (version && version.groom) {
        const G = S.groomSide;
        if (S.events.cocktail) S.events.cocktail = Object.assign({}, S.events.cocktail, { title: G.cocktailTitle, short: G.cocktailTitle });
        G.chapters.forEach((c, i) => { Object.assign(S.story.chapters[i], c); });
        S.nivi = {};
        document.documentElement.classList.add("groom-side");
    }

    S.groomFirst = q.get("side") === "groom" || !!(version && version.groom);
    if (S.groomFirst) {
        S.family.sides.reverse();
        S.contacts.people.reverse();
    }

    S.eventCount = Object.keys(S.events).length;
    const only = (q.get("events") || "").split(",").map((s) => s.trim()).filter((s) => S.events[s]);
    if (only.length) {
        Object.keys(S.events).forEach((id) => { if (!only.includes(id)) delete S.events[id]; });
    }
})();
