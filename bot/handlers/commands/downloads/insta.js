const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'insta',
  category: 'download',
  description: 'Download Instagram media',
  async execute(sock, msg, args, ctx) {
    if (!args.length) {
      await sock.sendMessage(ctx.from, { text: "Usage: !insta <Instagram URL>" }, { quoted: msg });
      return;
    }
    const url = args[0];
    try {
      const apiUrl = `https://api.igram.io/api/?url=${encodeURIComponent(url)}`;
      const res = await axios.get(apiUrl);
      if (!res.data || !res.data.media || res.data.media.length === 0) {
        await sock.sendMessage(ctx.from, { text: "No media found. Try another link." }, { quoted: msg });
        return;
      }
      for (const media of res.data.media) {
        const mediaUrl = media.url;
        const ext = media.type === "video" ? "mp4" : "jpg";
        const filePath = path.join(__dirname, `../../../../data/${Date.now()}-insta.${ext}`);
        const fileRes = await axios.get(mediaUrl, { responseType: 'arraybuffer' });
        fs.writeFileSync(filePath, fileRes.data);
        if (media.type === "video") {
          await sock.sendMessage(ctx.from, {
            video: { url: filePath },
            mimetype: 'video/mp4',
            caption: "Instagram Video",
          }, { quoted: msg });
        } else {
          await sock.sendMessage(ctx.from, {
            image: { url: filePath },
            caption: "Instagram Image",
          }, { quoted: msg });
        }
        fs.unlinkSync(filePath);
      }
    } catch (e) {
      await sock.sendMessage(ctx.from, { text: "Failed to download Instagram media." }, { quoted: msg });
    }
  }
};
