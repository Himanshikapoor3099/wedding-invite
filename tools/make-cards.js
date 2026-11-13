// Renders the image-only invitation cards to assets/cards/*.jpg
// Run from the repo root with a local server on :8770 (python3 -m http.server 8770)
const { chromium } = require("playwright");
(async () => {
    const b = await chromium.launch();
    const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
    // card name → layout chosen for it (see tools/card/card.html)
    const LOOKS = { wedding: "wedding", sangeet: "sangeet-arch-night" };
    for (const name of Object.keys(LOOKS)) {
        await p.goto(`http://localhost:8770/tools/card/card.html#${LOOKS[name]}`);
        await p.reload();
        await p.waitForLoadState("networkidle");
        await p.evaluate(() => document.fonts.ready);
        await p.screenshot({ path: `assets/cards/invite-${name}.jpg`, type: "jpeg", quality: 90 });
        console.log("wrote assets/cards/invite-" + name + ".jpg");
    }
    await b.close();
})();
