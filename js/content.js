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
        request: "request the pleasure of your company\nat the celebration of their marriage",
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
        toCocktail: "Saturday night. Dress to dazzle.",
        toMehndi: "Sunday night. Turn the volume up.",
        toHaldi: "Monday morning. Things are about to get yellow.",
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
                text: "He was the captain of his football team. She was coordinating the tournament, which meant sending him every match schedule, every fixture, every time change. It was all very professional for a while. Then, somewhere between \"your match is at 10\" and \"good luck today\", the conversations drifted to flirting.",
            },
            {
                title: "Meeting at Naraina Metro",
                art: "ch2-metro",
                text: "Eventually he asked her out, and they decided to meet at Naraina Metro. He picked her up from the station that day, and he's been picking her up from that very same spot ever since. Different plans, same metro station, every single time.",
            },
            {
                title: "Exploring Each Other's Favourites",
                art: "ch3-food",
                text: "This was the getting-to-know-you phase. Endless car rides with no real destination, long talks, and a mission to eat their way across Delhi until they had a favourite for every cuisine. Burma Burma, PF Chang's, Concept Shawarma, Galaxy Pizza, Moet's, Yum Yum Cha… the list kept growing, and so did their love.",
            },
            {
                title: "Poles Apart",
                art: "ch4-poles",
                text: "Somewhere along the way, they realised they were complete opposites. He loves movies; she'd pick a book. He's coffee; she's chai. He wants the beach; she wants the mountains. He's non-veg, she's veg. He loves dressing up and surprises; she loves being comfy and planning everything. Poles apart, and somehow that's exactly what works.",
            },
            {
                title: "The Surprise",
                art: "ch5-book",
                text: "Surprises have always been one of his favourite things, and the proposal was his best one yet. He's always loved gifting her books, so of course a book had to be part of the most special day. He went down on one knee with a ring, and the book held the final question.",
                surprise: { wrap: "Open for a surprise", card: "", after: "She said yes." },
            },
            {
                title: "Game, Set, Match",
                art: "ch6-tennis",
                text: "He's always been into sports: football, cricket, pickleball, tennis. But tennis is his favourite, so that's exactly where she chose to propose to him, with a row of tennis balls spelling out the question. Two yeses later, the only thing left to do was plan a wedding.",
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
            kicker: "Saturday night",
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
            note: "Blessings first, then the bar opens and the dance floor takes over. Wear something that catches the light.",
        },
        haldi: {
            art: "ev-haldi",
            kicker: "Monday morning",
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
            note: "Wear nothing you'd miss. Turmeric has a long memory.",
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
            note: "Come early. The baraat waits for no one.",
            scheduleTitle: "Order of the day",
            scheduleHint: "",
            schedule: [
                { time: "9:00 am", name: "Sehrabandi & Ghodi Chadhi", about: "The groom's family ties on his sehra, and he mounts the ghodi for the journey ahead." },
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
            kicker: "Sunday night",
            short: "Mehndi, Music & Masti",
            title: "Mehndi, Music & Masti",
            tagline: "",
            date: "2026-11-29", start: "20:00", end: "23:59",
            timeLabel: "8 pm onwards",
            venue: "Chatoreee Restaurant",
            address: "Shop No. 7, AU Block, Ranikhet, Pitampura, Delhi 110034",
            mapUrl: "",
            note: "Henna on the hands, a playlist with no skip button, and an open invitation to dance like nobody's filming. Somebody will be.",
        },
    },
    versions: {
        "bride-complete": { events: ["mehndi"] },
        "bride-no-cocktail": { events: ["mehndi"], hide: ["cocktail"], dates: "29 Nov — 01 Dec 2026" },
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
            { side: "bride", title: "The bride's family", family: "The Kapoors", names: [] },
            { side: "groom", title: "The groom's family", family: "The Sachdevas", names: [] },
        ],
    },
    contacts: {
        title: "Questions? Call us",
        people: [
            { side: "bride", name: "Urvashi Kapoor", role: "The bride's family", phone: "+91 92107 08587" },
            { side: "groom", name: "Gulshan Sachdeva", role: "The groom's family", phone: "+91 98111 38797" },
        ],
    },

    closing: {
        signoff: "",
        families: "",
        line: "See you on the dance floor.",
    },

    shareText: "You're invited to the wedding of Himanshi & Karan · 28 Nov — 01 Dec 2026 · New Delhi",
    musicUrl: "assets/audio/music.mp3",
};

/* ---------- Changes made by the link --------------------------------------
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
    const version = S.versions[window.INVITE_VERSION];
    if (version) {
        (version.events || []).forEach((id) => { S.events[id] = S.extraEvents[id]; });
        (version.hide || []).forEach((id) => { delete S.events[id]; });
        if (version.dates) S.shareText = S.shareText.replace("28 Nov — 01 Dec 2026", version.dates);
        const sorted = Object.entries(S.events).sort((a, b) => (a[1].date + a[1].start).localeCompare(b[1].date + b[1].start));
        S.events = Object.fromEntries(sorted);
    }

    S.groomFirst = q.get("side") === "groom";
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
