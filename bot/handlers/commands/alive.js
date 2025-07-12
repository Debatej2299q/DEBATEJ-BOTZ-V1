const config = require('../../config');
module.exports = {
  name: 'alive',
  category: 'bot',
  description: 'Check if bot is running',
  async execute(sock, msg, args, ctx) {
    const aliveText = `✅ Bot is Alive!\nOwner: ${config.ownerNumber}\nPrefix: ${config.prefix}\nUse !menu for commands.\n> © DEBATEJ-BOTZ, 2025`;
    await sock.sendMessage(ctx.from, { image: { url: config.alivePicUrl }, caption: aliveText }, { quoted: msg });
  }
};
