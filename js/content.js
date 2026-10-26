/* ==========================================================================
   SITE CONTENT: every name, date, line of text, link and photo.
   Edit the values on the right of each colon and keep the quotes and commas.
     • Leave a text as "" to hide it.
     • Use \n inside a text to start a new line.
   After an edit, refresh the page.
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

    /* ---------- Envelope (first screen) --------------------------------- */
    envelope: {
        pretext: "You are invited to the wedding of",
        hint: "Tap the envelope to open",
    },

    /* ---------- Opening: blessings, names and parents ------------------- */
    hero: {
        blessings: [
            { symbol: "ॐ", line: "॥ श्री गणेशाय नमः ॥", lang: "hi" },
            { symbol: "ੴ", line: "॥ ਵਾਹਿਗੁਰੂ ॥", lang: "pa" },
        ],
        invite: "With the blessings of the Almighty and our elders,\nwe joyfully invite you to celebrate the wedding of",
        brideParents: "D/O Mrs. Pramila & Mr. Gulshan Kapoor\nand Mrs. Chanchal & Mr. Praveen Kapoor",
        groomParents: "S/O Mrs. Meenu & Mr. Gulshan Sachdeva",
    },

    /* ---------- Save the date ------------------------------------------- */
    saveTheDate: {
        label: "Save the Dates",
        dates: "28 Nov – 01 Dec 2026",
        scratch: "Scratch to reveal",
        countdownTo: "wedding",
        countdownLabel: "until we say “I do”",
        during: "The celebrations have begun!",
        after: "Thank you for celebrating with us",
    },

    /* ---------- Our story, as a streaming series ------------------------ */
    story: {
        label: "H&K Originals",
        title: "KaranMani-fested",
        meta: ["98% Match", "2026", "U/A ∞", "6 Episodes", "HD"],
        top10: "#1 in Love Stories Today",
        logline: "She scheduled his matches. He scheduled their first date. Two people who are opposites in almost every way find out that, somehow, they just fit.",
        genres: "Romantic · Feel-good · Opposites Attract",
        poster: "assets/photos/beach.jpg",
        playLabel: "Play",
        episodesLabel: "Episodes",
        episodes: [
            {
                title: "The Fixture",
                art: "football",
                text: "He was playing in a football tournament. She was hosting it through Reliance Foundation Youth Sports. Every message she sent him was a match schedule… until one day, it wasn't.",
            },
            {
                title: "Pickup at Naraina Metro",
                image: "assets/photos/car-selfie.jpg",
                text: "He finally asked to meet. The first date began with an i10 pulling up at Naraina Metro, and a conversation that has never really ended.",
            },
            {
                title: "The Food Trail",
                image: "assets/photos/night-out.jpg",
                text: "Many more meetings followed, most of them around a table. They ate their way across Delhi, one favourite restaurant at a time.",
                extra: "food",
            },
            {
                title: "Poles Apart",
                image: "assets/photos/beach.jpg",
                text: "Different in almost every way. Somehow, it just works.",
                extra: "opposites",
            },
            {
                title: "The Book",
                art: "book",
                text: "He loves surprises, and his most memorable one came between the pages of a book. Tap the book to read it.",
                extra: "book",
            },
            {
                title: "Game, Set, Match",
                image: "assets/photos/tennis-proposal-wide.jpg",
                text: "Then she turned the tables. On a tennis court, down on one knee, with tennis balls that asked the question for her.",
                extra: "tennis",
            },
        ],
        restaurants: ["Galaxy", "Moets", "Burma Burma", "Yum Yum Cha"],
        opposites: {
            her: "Himanshi",
            him: "Karan",
            rows: [
                ["🍵", "Tea", "Coffee", "☕"],
                ["🏔️", "Mountains", "Beaches", "🏖️"],
                ["🌌", "Night skies", "Evening skies", "🌇"],
                ["📚", "Books", "Sports", "⚽"],
            ],
            commonLabel: "…but both love",
            common: ["🥟 Momos", "🚗 Long drives", "✈️ Travel", "❤️ Each other"],
        },
        // The book he gave her: a cover, then pages, ending with the question
        book: {
            cover: "Us",
            coverBy: "a story by Karan",
            pages: [
                "For Himanshi —\nthe girl who sent the best match schedules.",
                "Chapter 1\n\nA football tournament, a few messages, and a pickup from Naraina Metro.",
                "Chapter 2\n\nTea & coffee.\nMountains & beaches.\nNight skies & evening skies.\n\nSomehow, we fit.",
                "Chapter 3\n\nEvery plate of momos, every long drive, every trip — better with you.",
                "The last chapter isn't written yet.\n\nI was hoping we could write it together…",
                "Will you marry me?",
            ],
            hint: "Tap the book to turn the page",
        },
        tennisPhoto: "assets/photos/tennis-proposal.jpg",
        tennisBalls: "WILL YOU MARRY ME?",
        finale: "And that's how our story went from scheduling matches\nto planning our marriage together.",
        nextSeason: "Season 2 · Happily Ever After · Premieres 01.12.2026",
    },

    /* ---------- Ivy invites you ----------------------------------------- */
    ivy: {
        label: "A message from Ivy",
        // Put a photo of Ivy at this path to replace the drawing
        photo: "assets/photos/ivy.jpg",
        greeting: "Woof! I'm Ivy 🐾",
        text: "My hoomans Himanshi & Karan are getting married, and I've been put in charge of the invitations (I was promised treats). Please come to:",
        signoff: "Don't be late. I'll be checking.\n— Ivy, Chief Invitation Officer",
        galleryTitle: "Ivy's portfolio",
        gallery: [
            { photo: "assets/photos/ivy-sunny.jpg", caption: "Dressed for the occasion" },
            { photo: "assets/photos/ivy-chin.jpg", caption: "Accepting chin scratches" },
            { photo: "assets/photos/ivy-ears.jpg", caption: "Ears ready for the dhol" },
            { photo: "assets/photos/ivy-panda.jpg", caption: "My plus-one" },
        ],
    },

    /* All event times are India Standard Time, wherever the guest opens it */
    timeZone: { offset: "+05:30", name: "Asia/Kolkata" },

    /* ---------- The events, in order -------------------------------------
       date "YYYY-MM-DD", start/end 24-hour "HH:MM" (an end earlier than the
       start means after midnight). mapUrl opens the venue in Google Maps. */
    events: {
        cocktail: {
            short: "Sagan & Cocktail",
            title: "Sagan & Cocktail Night",
            tagline: "A Little Shagun, A Lot of Sparkle",
            date: "2026-11-28", start: "19:00", end: "23:30",
            timeLabel: "7:00 PM onwards",
            venue: "ClubXO",
            address: "Site 2, Shivaji Place, Shivaji Enclave, Raja Garden, New Delhi, Delhi – 110027",
            mapUrl: "https://share.google/Hy4zNm8MEn87sH9yP",
            dressCode: "Black & Gold, or Black & Silver. Bring the bling!",
            swatches: ["#0b0b0b", "#d4af37", "#c9ccd1"],
            note: "Dance floor's open, disco balls are spinning. Come ready to sparkle.",
        },
        mehndi: {
            short: "Mehndi",
            title: "Mehndi, Music & Masti",
            tagline: "A Little Mehndi, A Lot of Masti",
            date: "2026-11-29", start: "20:00", end: "23:59",
            timeLabel: "8:00 PM onwards",
            venue: "Chatoreee Restaurant",
            address: "Shop No. 7, AU Block, Ranikhet, Pitampura, Delhi – 110034",
            mapUrl: "",
            dressCode: "",
            swatches: [],
            note: "Henna on the hands, music in the air and plenty of masti.",
        },
        haldi: {
            short: "Haldi",
            title: "Haldi Ceremony",
            kicker: "Let's Get Haldi-y!",
            tagline: "A Little Haldi, A Lot of Hungama",
            date: "2026-11-30", start: "11:00", end: "15:00",
            timeLabel: "11:00 AM onwards",
            venue: "Pankh Punjabi Bagh Club",
            address: "Ring Road, near Mahanvir Nursing Home, West Punjabi Bagh, Punjabi Bagh, New Delhi, Delhi – 110026",
            mapUrl: "https://share.google/j9eCTfdyrUy5IeD31",
            dressCode: "Lavender & Yellow",
            swatches: ["#b9a3e3", "#f6cf3e"],
            note: "Wear something you don't mind getting a little yellow!",
        },
        wedding: {
            short: "Wedding",
            title: "Wedding Ceremony",
            kicker: "The Big Fat I Do",
            tagline: "A Little Teary-Eyed, A Lot of Happily Ever After",
            date: "2026-12-01", start: "11:00", end: "16:00",
            timeLabel: "11:00 AM – 4:00 PM",
            venue: "Ambria Pushpanjali",
            address: "F-20, Dwarka Link Road, Samalka, New Delhi, Delhi – 110061",
            mapUrl: "https://share.google/MnzBjltmZXg6iUMne",
            dressCode: "Beige & Cherry Red",
            swatches: ["#e8d8bf", "#9b111e"],
            note: "",
            scheduleTitle: "The Day",
            scheduleHint: "Tap a ritual to know more",
            schedule: [
                { time: "09:00 AM", name: "Sehrabandi & Ghodi Chadhi", about: "The sehra is tied on the groom by his family, and he mounts the ghodi for the journey ahead." },
                { time: "10:00 AM", name: "Baraat", about: "The groom arrives with family and friends in a joyful procession of dhol, music and dancing." },
                { time: "11:00 AM", name: "Milni", about: "The elders of both families meet and embrace. Two families become one." },
                { time: "12:00 PM", name: "Varmala", about: "The bride and groom exchange garlands, choosing each other in front of everyone they love." },
                { time: "01:00 PM", name: "Phere", about: "The couple walk around the sacred fire, taking a vow with every round." },
                { time: "02:00 PM", name: "Lunch", about: "Good food, laughter and celebration, all together." },
                { time: "04:00 PM", name: "Vidai", about: "A tender farewell as the bride leaves her parents' home, showered with blessings for her new life." },
            ],
        },
    },

    /* A note to every guest (shown after the events) */
    guestNote: "Four days, two families, one big celebration. Your presence is the only gift we need. Just bring your blessings, your dancing shoes and a big appetite!",

    /* ---------- RSVP -----------------------------------------------------
       formUrl: the Google Form's link (Send → link). Until it is set, the
       button opens WhatsApp to the contact for the guest's side instead.
       nameEntry: optional prefill id, e.g. "entry.123456789" (see README). */
    rsvp: {
        title: "Will you join us?",
        text: "Let us know how many of you are coming and which celebrations you'll attend.",
        by: "Kindly respond by 10 November 2026",
        button: "RSVP now",
        formUrl: "",
        nameEntry: "",
    },

    /* ---------- Families and contacts ----------------------------------- */
    family: {
        label: "Swagatakankshi",
        title: "Our Families",
        sides: [
            { side: "bride", title: "Bride's Side", family: "The Kapoor Family", names: [] },
            { side: "groom", title: "Groom's Side", family: "The Sachdeva Family", names: [] },
        ],
    },
    contacts: {
        title: "For any help, reach out to",
        people: [
            { side: "bride", name: "Urvashi Kapoor", role: "Bride's side", phone: "+91 92107 08587" },
            { side: "groom", name: "Gulshan Sachdeva", role: "Groom's father", phone: "+91 98111 38797" },
        ],
    },

    closing: {
        signoff: "With love",
        families: "The Kapoor & Sachdeva Families",
    },

    shareText: "You're invited to the wedding of Himanshi & Karan · 28 Nov – 01 Dec 2026, New Delhi",
    musicUrl: "assets/audio/music.mp3",
};

/* ---------- Changes made by the link --------------------------------------
   ?to=Sharma%20Family      → "Dear Sharma Family" on the envelope
   ?side=groom              → groom's name and family first, groom's contact for RSVP
   ?events=haldi,wedding    → only those celebrations
   (links.html makes these links for you) */
(function () {
    const S = window.SITE;
    const q = new URLSearchParams(window.location.search || "");

    const to = (q.get("to") || "").trim().slice(0, 60);
    S.guest = to;
    if (to) S.envelope.pretext = "Dear " + to + ",\nyou are invited to the wedding of";

    S.groomFirst = q.get("side") === "groom";
    if (S.groomFirst) {
        S.family.sides.reverse();
        S.contacts.people.reverse();
        S.closing.families = "The Sachdeva & Kapoor Families";
    }

    const only = (q.get("events") || "").split(",").map((s) => s.trim()).filter((s) => S.events[s]);
    if (only.length) {
        Object.keys(S.events).forEach((id) => { if (!only.includes(id)) delete S.events[id]; });
    }
})();
