// Renders short video invitations to assets/cards/*.mp4 from tools/card/card.html.
// Run from the repo root with a local server on :8770 and ffmpeg installed.
const { chromium } = require("playwright");
const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const FPS = 30, SECONDS = 10;
const VIDEOS = { wedding: "wedding", sangeet: "sangeet-arch-night", "sangeet-cream": "sangeet-arch-cream" };
const MUSIC = { file: "assets/audio/music.mp3", start: 0 };

(async () => {
    const b = await chromium.launch();
    const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
    for (const [name, look] of Object.entries(VIDEOS)) {
        const dir = fs.mkdtempSync(path.join(os.tmpdir(), "card-"));
        await p.goto(`http://localhost:8770/tools/card/card.html?video&t=${Date.now()}#${look}`);
        await p.waitForLoadState("networkidle");
        await p.evaluate(() => document.fonts.ready);
        await p.evaluate(() => document.getAnimations().forEach((a) => a.pause()));
        for (let f = 0; f < FPS * SECONDS; f++) {
            const t = (f / FPS) * 1000;
            await p.evaluate((t) => document.getAnimations().forEach((a) => { a.currentTime = t; }), t);
            await p.screenshot({ path: path.join(dir, `f${String(f).padStart(4, "0")}.jpg`), type: "jpeg", quality: 92 });
        }
        const out = `assets/cards/invite-${name}.mp4`;
        execFileSync("ffmpeg", ["-v", "error", "-y", "-framerate", String(FPS), "-i", path.join(dir, "f%04d.jpg"),
            "-ss", String(MUSIC.start), "-t", String(SECONDS), "-i", MUSIC.file,
            "-filter_complex", `[1:a]afade=t=in:d=1,afade=t=out:st=${SECONDS - 2}:d=2[a]`,
            "-map", "0:v", "-map", "[a]", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "23", "-preset", "medium",
            "-c:a", "aac", "-b:a", "128k", "-shortest", "-movflags", "+faststart", out]);
        fs.rmSync(dir, { recursive: true });
        console.log("wrote", out);
    }
    await b.close();
})();
