const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'play',
  category: 'download',
  description: 'Download YouTube audio (music)',
  async execute(sock, msg, args, ctx) {
    if (!args.length) {
      await sock.sendMessage(ctx.from, { text: "Usage: !play <YouTube URL>" }, { quoted: msg });
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
      const audioPath = path.join(__dirname, '../../../../data', `${Date.now()}-audio.mp3`);
      await new Promise((resolve, reject) => {
        ytdl(url, { filter: 'audioonly' })
          .pipe(fs.createWriteStream(audioPath))
          .on('finish', resolve)
          .on('error', reject);
      });
      await sock.sendMessage(ctx.from, {
        audio: { url: audioPath },
        mimetype: 'audio/mp3',
        fileName: `${title}.mp3`,
        caption: `Downloaded: ${title}`,
      }, { quoted: msg });
      fs.unlinkSync(audioPath);
    } catch (e) {
      await sock.sendMessage(ctx.from, { text: "Failed to download audio." }, { quoted: msg });
    }
  }
};
