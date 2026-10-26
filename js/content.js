/* ==========================================================================
   SITE CONTENT: every name, date, line of text and link.
   Edit the values on the right of each colon and keep the quotes and commas.
     • Leave a text as "" to hide it.
     • Use \n inside a text to start a new line.
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

    envelope: {
        pretext: "Together with their families",
        hint: "Break the seal",
    },

    hero: {
        blessings: [
            { symbol: "ॐ", line: "॥ श्री गणेशाय नमः ॥", lang: "hi" },
            { symbol: "ੴ", line: "॥ ਵਾਹਿਗੁਰੂ ॥", lang: "pa" },
        ],
        invite: "With the blessings of our families,\nwe request the pleasure of your company\nat the marriage of",
        brideParents: "Daughter of Mrs. Pramila & Mr. Gulshan Kapoor\nand Mrs. Chanchal & Mr. Praveen Kapoor",
        groomParents: "Son of Mrs. Meenu & Mr. Gulshan Sachdeva",
        motto: "Poles apart. Perfectly matched.",
    },

    saveTheDate: {
        label: "Save the dates",
        dates: "28 Nov — 01 Dec\n2026 · New Delhi",
        scratch: "Scratch gently",
        countdownTo: "wedding",
        countdownLabel: "until forever, officially",
        during: "The celebrations are underway.",
        after: "Thank you for celebrating with us.",
    },

    /* The lines shown between sections while the colours change */
    passages: {
        toStory: "Before the wedding, a little backstory.",
        toIvy: "A word from the one who really runs the house.",
        toCocktail: "Night one. Dress to dazzle.",
        toMehndi: "Night two. Turn the volume up.",
        toHaldi: "Morning three. Things are about to get yellow.",
        toWedding: "And then, the main event.",
        toRsvp: "Now, the only question that matters.",
    },

    /* ---------- Our story, as a streaming series ------------------------ */
    story: {
        label: "An H&K Original",
        title: "KaranMani-fested",
        meta: ["98% match", "2026", "U/A ∞", "6 episodes"],
        top10: "No. 1 in Love Stories today",
        logline: "She scheduled his matches. He scheduled everything after. A series about two people who disagree on almost everything, except each other.",
        genres: "Romance · Comedy · Opposites attract",
        playLabel: "Play",
        episodesLabel: "Episodes",
        episodes: [
            {
                title: "The Fixture",
                art: "fixture",
                text: "Every love story needs a meet-cute. Ours came with a match schedule. She was running a Reliance Foundation Youth Sports tournament; he was a name on her player list. The messages were strictly business, until, quietly, they weren't.",
            },
            {
                title: "Pickup at Naraina Metro",
                art: "metro",
                text: "He asked her out. She said yes. A trusty i10 pulled up at Naraina Metro, and somewhere between the station and the first stop, a conversation began that neither of them has managed to finish since.",
            },
            {
                title: "The Tasting Menu",
                art: "table",
                text: "What followed was a thorough investigation of Delhi's finest tables. Research, they called it. Everyone else called it dating.",
                extra: "food",
            },
            {
                title: "Poles Apart",
                art: "poles",
                text: "On paper, a mismatch. In person, a perfect fit.",
                extra: "opposites",
            },
            {
                title: "Plot Twist",
                art: "book",
                text: "He has a weakness for surprises, and he saved his best one for a book: written for her, with a final page that asked the only question that mattered. Turn the pages yourself.",
                extra: "book",
            },
            {
                title: "Game, Set, Match",
                art: "tennis",
                text: "Never one to be outdone, she returned the serve. On a tennis court, on one knee, with a row of tennis balls doing the talking.",
                extra: "tennis",
            },
        ],
        restaurants: [
            { name: "Yum Yum Cha", note: "for the dumplings" },
            { name: "Burma Burma", note: "for the long dinners" },
            { name: "Galaxy", note: "for the late nights" },
            { name: "Moet's", note: "for the regulars' table" },
        ],
        opposites: {
            her: "Her",
            him: "Him",
            rows: [
                ["Tea, strong", "Coffee, black"],
                ["Mountains", "Beaches"],
                ["Night skies", "Evening skies"],
                ["A good book", "A good match"],
            ],
            commonLabel: "Common ground",
            common: ["Momos", "Long drives", "New places", "Each other"],
        },
        book: {
            cover: "Us",
            coverBy: "A love story · by Karan",
            pages: [
                "For Himanshi,\nwho sent the best match schedules\nI have ever received.",
                "Chapter One\n\nIn which a tournament becomes an excuse, and the excuse becomes a first date.",
                "Chapter Two\n\nTea and coffee.\nMountains and beaches.\nStarlight and sunsets.\n\nWe never did agree on much.",
                "Chapter Three\n\nExcept, it turns out, on momos, long drives and each other.",
                "The rest of this book is blank.\n\nI was hoping we could write it together…",
                "Will you\nmarry me?",
            ],
            answer: "She said yes.",
            hint: "Tap to turn the page",
        },
        tennisBalls: "WILL YOU MARRY ME?",
        tennisAnswer: "He said yes, too.",
        finale: "From fixing match schedules\nto fixing a wedding date.",
        nextSeason: "Season Two premieres 01 December 2026",
    },

    /* ---------- Ivy's memo ---------------------------------------------- */
    ivy: {
        label: "Inter-office memo",
        from: "Ivy, Head of Household Security & Chief Snack Inspector",
        to: "You, specifically",
        re: "The wedding of my two favourite humans",
        body: [
            "I have been informed that my humans are getting married. I was not consulted. I approve anyway.",
            "They have put me in charge of invitations, presumably because I am the most organised member of the household and the only one who has never been late for dinner.",
            "Your attendance is requested as follows:",
        ],
        notes: {
            cocktail: "Wear something that catches the light. I will be judging.",
            mehndi: "There will be dancing. I have been practising.",
            haldi: "Things will get yellow. I have been asked not to roll in it.",
            wedding: "The big one. Bring tissues. Treats also accepted.",
        },
        signoff: "With paws and regards,",
        name: "Ivy",
        title: "Very Good Girl, ret'd.",
        stamp: "Approved",
    },

    timeZone: { offset: "+05:30", name: "Asia/Kolkata" },

    /* ---------- The events, in order -------------------------------------
       date "YYYY-MM-DD", start/end 24-hour "HH:MM" (an end earlier than the
       start means after midnight). mapUrl opens the venue in Google Maps. */
    events: {
        cocktail: {
            kicker: "Night one",
            short: "Sagan & Cocktails",
            title: "Sagan & Cocktails",
            tagline: "A little shagun, a lot of sparkle.",
            date: "2026-11-28", start: "19:00", end: "23:30",
            timeLabel: "7 pm onwards",
            venue: "ClubXO",
            address: "Site 2, Shivaji Place, Shivaji Enclave, Raja Garden, New Delhi 110027",
            mapUrl: "https://share.google/Hy4zNm8MEn87sH9yP",
            dressCode: "Black with a flash of gold or silver",
            swatches: ["#0b0b0b", "#d4af37", "#c9ccd1"],
            note: "Blessings first, then the bar opens and the dance floor takes over. The shinier, the better.",
        },
        mehndi: {
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
        line: "See you on the dance floor.",
    },

    shareText: "You're invited to the wedding of Himanshi & Karan · 28 Nov — 01 Dec 2026 · New Delhi",
    musicUrl: "assets/audio/music.mp3",
};

/* ---------- Changes made by the link --------------------------------------
   ?to=Sharma%20Family      → "Dear Sharma Family" on the envelope and in Ivy's memo
   ?side=groom              → groom's name and family first, groom's contact for RSVP
   ?events=haldi,wedding    → only those celebrations
   (links.html makes these links for you) */
(function () {
    const S = window.SITE;
    const q = new URLSearchParams(window.location.search || "");

    const to = (q.get("to") || "").trim().slice(0, 60);
    S.guest = to;
    if (to) {
        S.envelope.pretext = "Dear " + to;
        S.ivy.to = to;
    }

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
