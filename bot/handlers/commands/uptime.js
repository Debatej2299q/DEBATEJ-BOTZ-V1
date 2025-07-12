const os = require('os');
module.exports = {
  name: 'uptime',
  category: 'bot',
  description: 'Shows bot uptime',
  async execute(sock, msg, args, ctx) {
    const sec = Math.floor(process.uptime());
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    await sock.sendMessage(ctx.from, {
      text: `⏱ Uptime: ${h}h ${m}m ${s}s`
    }, { quoted: msg });
  }
};
