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
        hashtag: "#KaranMani-fested",
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
        brideParents: "Daughter of Mrs. Pramila & Mr. Gulshan Kapoor\nand Mrs. Chanchal & Mr. Praveen Kapoor",
        groomParents: "Son of Mrs. Meenu & Mr. Gulshan Sachdeva",
        request: "request the pleasure of your company\nat the celebration of their marriage",
        dates: "28 November — 01 December 2026",
        city: "New Delhi",
        ivyNote: "Ivy insisted on delivering this one herself.\nShe also insists you come.",
    },

    saveTheDate: {
        countdownTo: "wedding",
        countdownLabel: "until forever, officially",
        during: "The celebrations are underway.",
        after: "Thank you for celebrating with us.",
    },

    /* The lines shown between sections while the colours change */
    passages: {
        toStory: "But first, how did we get here?",
        toCocktail: "Night one. Dress to dazzle.",
        toMehndi: "Night two. Turn the volume up.",
        toHaldi: "Morning three. Things are about to get yellow.",
        toWedding: "And then, the main event.",
        toRsvp: "Now, the only question that matters.",
    },

    /* ---------- Our story: a storybook ----------------------------------- */
    story: {
        title: "KaranMani-fested",
        subtitle: "Our story, in six chapters",
        coverBy: "by Himanshi & Karan",
        openHint: "Tap to open the book",
        turnHint: "Swipe or tap the arrows to turn the page",
        chapters: [
            {
                title: "The Fixture",
                art: "ch1-fixture",
                text: "Every love story needs a meet-cute. Ours came with a match schedule. She was running a Reliance Foundation Youth Sports tournament; he was a name on her player list. The messages were strictly business, until, quietly, they weren't.",
            },
            {
                title: "Pickup at Naraina Metro",
                art: "ch2-metro",
                text: "He asked her out. She said yes. A trusty i10 pulled up at Naraina Metro, and somewhere between the station and the first stop, a conversation began that neither of them has managed to finish since.",
            },
            {
                title: "The Tasting Menu",
                art: "ch3-food",
                text: "Then came a thorough investigation of Delhi's finest tables: momos at Yum Yum Cha, long dinners at Burma Burma, late nights at Galaxy and Moet's. Research, they called it. Everyone else called it dating.",
            },
            {
                title: "Poles Apart",
                art: "ch4-poles",
                text: "She takes her tea strong and her mountains snow-capped. He takes his coffee black and his beaches sun-soaked. She loves a night sky; he loves an evening one. On paper, a mismatch. In person, a perfect fit.",
            },
            {
                title: "Between the Pages",
                art: "ch5-book",
                text: "He has a weakness for surprises. One evening he handed her a book, nothing unusual about that, until a card slipped out from between the pages.",
                surprise: { wrap: "Open for a surprise", card: "Will you\nmarry me?", after: "She said yes." },
            },
            {
                title: "Game, Set, Match",
                art: "ch6-tennis",
                text: "Never one to be outdone, she returned the serve. On a tennis court, on one knee, with a row of tennis balls doing the asking.",
                balls: "WILL YOU MARRY ME?",
            },
        ],
        finale: {
            art: "finale",
            title: "To be continued…",
            text: "From fixing match schedules\nto fixing a wedding date.",
        },
    },

    timeZone: { offset: "+05:30", name: "Asia/Kolkata" },

    /* ---------- The events, in order -------------------------------------
       date "YYYY-MM-DD", start/end 24-hour "HH:MM" (an end earlier than the
       start means after midnight). mapUrl opens the venue in Google Maps. */
    events: {
        cocktail: {
            art: "ev-cocktail",
            kicker: "Night one",
            short: "Sagan & Cocktails",
            title: "Sagan & Cocktails",
            tagline: "A little shagun, a lot of sparkle.",
            date: "2026-11-28", start: "19:00", end: "23:30",
            timeLabel: "7 pm onwards",
            venue: "ClubXO",
            address: "Site 2, Shivaji Place, Shivaji Enclave, Raja Garden, New Delhi 110027",
            mapUrl: "https://share.google/Hy4zNm8MEn87sH9yP",
            dressCode: "Blue and silver",
            swatches: ["#8fa9cf", "#c9d1dc"],
            note: "Blessings first, then the bar opens and the dance floor takes over. Wear something that catches the light.",
        },
        mehndi: {
            art: "ev-mehndi",
            kicker: "Night two",
            short: "Mehndi, Music & Masti",
            title: "Mehndi, Music & Masti",
            tagline: "A little mehndi, a lot of masti.",
            date: "2026-11-29", start: "20:00", end: "23:59",
            timeLabel: "8 pm onwards",
            venue: "Chatoreee Restaurant",
            address: "Shop No. 7, AU Block, Ranikhet, Pitampura, Delhi 110034",
            mapUrl: "",
            dressCode: "",
            swatches: [],
            note: "Henna on the hands, a playlist with no skip button, and an open invitation to dance like nobody's filming. Somebody will be.",
        },
        haldi: {
            art: "ev-haldi",
            kicker: "Morning three",
            short: "Haldi",
            title: "Haldi",
            tagline: "A little haldi, a lot of hungama.",
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
            kicker: "The big day",
            short: "The Wedding",
            title: "The Wedding",
            tagline: "A little teary-eyed, a lot of happily ever after.",
            date: "2026-12-01", start: "11:00", end: "16:00",
            timeLabel: "11 am — 4 pm",
            venue: "Ambria Pushpanjali",
            address: "F-20, Dwarka Link Road, Samalka, New Delhi 110061",
            mapUrl: "https://share.google/MnzBjltmZXg6iUMne",
            dressCode: "Beige and cherry red",
            swatches: ["#e8d8bf", "#9b111e"],
            note: "Come early. The baraat waits for no one.",
            scheduleTitle: "Order of the day",
            scheduleHint: "Tap a ritual to learn more",
            schedule: [
                { time: "9:00", name: "Sehrabandi & Ghodi Chadhi", about: "The groom's family ties on his sehra, and he mounts the ghodi for the journey ahead." },
                { time: "10:00", name: "Baraat", about: "The groom arrives with family and friends in a procession of dhol, dancing and no small amount of noise." },
                { time: "11:00", name: "Milni", about: "The elders of both families meet and embrace. Two families become one." },
                { time: "12:00", name: "Varmala", about: "Garlands are exchanged, and the bride and groom choose each other in front of everyone they love." },
                { time: "1:00", name: "Phere", about: "Around the sacred fire, the couple take their vows, one round at a time." },
                { time: "2:00", name: "Lunch", about: "A long table, good food and everyone together." },
                { time: "4:00", name: "Vidai", about: "A tender farewell as the bride leaves her parents' home, carried by everyone's blessings." },
            ],
        },
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
            { side: "groom", name: "Gulshan Sachdeva", role: "The groom's father", phone: "+91 98111 38797" },
        ],
    },

    closing: {
        signoff: "With love,",
        families: "The Kapoor & Sachdeva families",
        line: "See you on the dance floor. Ivy will be at the door.",
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

    S.groomFirst = q.get("side") === "groom";
    if (S.groomFirst) {
        S.family.sides.reverse();
        S.contacts.people.reverse();
        S.closing.families = "The Sachdeva & Kapoor families";
    }

    const only = (q.get("events") || "").split(",").map((s) => s.trim()).filter((s) => S.events[s]);
    if (only.length) {
        Object.keys(S.events).forEach((id) => { if (!only.includes(id)) delete S.events[id]; });
    }
})();
