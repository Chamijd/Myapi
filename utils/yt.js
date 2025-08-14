const ytdl = require("@distube/ytdl-core");

async function getMP3(url) {
    if (!ytdl.validateURL(url)) throw new Error("Invalid YouTube URL");
    const info = await ytdl.getInfo(url);
    return {
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails.pop().url,
        download: ytdl(url, { filter: "audioonly", quality: "highestaudio" })
    };
}

async function getMP4(url) {
    if (!ytdl.validateURL(url)) throw new Error("Invalid YouTube URL");
    const info = await ytdl.getInfo(url);
    return {
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails.pop().url,
        download: ytdl(url, { filter: "videoandaudio", quality: "highest" })
    };
}

module.exports = { getMP3, getMP4 };
