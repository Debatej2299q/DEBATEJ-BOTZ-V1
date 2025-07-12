const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'ytdl',
  category: 'download',
  description: 'Download YouTube video',
  async execute(sock, msg, args, ctx) {
    if (!args.length) {
      await sock.sendMessage(ctx.from, { text: "Usage: !ytdl <YouTube URL>" }, { quoted: msg });
      return;
    }
    const url = args[0];
    if (!ytdl.validateURL(url)) {
      await sock.sendMessage(ctx.from, { text: "Invalid YouTube URL." }, { quoted: msg });
      return;
    }
    try {
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title;
      const videoPath = path.join(__dirname, '../../../../data', `${Date.now()}-video.mp4`);
      await new Promise((resolve, reject) => {
        ytdl(url, { quality: '18' })
          .pipe(fs.createWriteStream(videoPath))
          .on('finish', resolve)
          .on('error', reject);
      });
      await sock.sendMessage(ctx.from, {
        document: { url: videoPath },
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`,
        caption: `Downloaded: ${title}`,
      }, { quoted: msg });
      fs.unlinkSync(videoPath);
    } catch (e) {
      await sock.sendMessage(ctx.from, { text: "Failed to download video." }, { quoted: msg });
    }
  }
};
