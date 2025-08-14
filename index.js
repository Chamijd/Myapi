const express = require("express");
const cors = require("cors");
const { getMP3, getMP4 } = require("./utils/yt");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send("🚀 YouTube MP3 / MP4 Downloader API is running!");
});

app.get("/api/ytmp3", async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).json({ error: "Missing YouTube URL" });

        const { title, thumbnail, download } = await getMP3(url);
        res.setHeader("Content-Disposition", `attachment; filename="${title}.mp3"`);
        download.pipe(res);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/ytmp4", async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) return res.status(400).json({ error: "Missing YouTube URL" });

        const { title, thumbnail, download } = await getMP4(url);
        res.setHeader("Content-Disposition", `attachment; filename="${title}.mp4"`);
        download.pipe(res);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
