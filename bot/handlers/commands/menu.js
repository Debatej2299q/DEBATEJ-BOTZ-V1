const config = require('../../config');
module.exports = {
  name: 'menu',
  category: 'bot',
  description: 'Show bot menu and features',
  async execute(sock, msg, args, ctx) {
    const menuText = `
*Bot Menu*
• !menu - Show this menu
• !ping - Bot latency
• !alive - Check bot status
• !uptime - How long bot is running

*Download*
• !ytdl <url> - Download YouTube video
• !play <url> - Download YouTube audio
• !insta <url> - Instagram media
• !img <url> - Download image

*Pokemon*
• !start-pokemon-journey
• !pokemon <name>
• !catch
• !pokedex
• !gpokemon <name> <@user>
• !battle <@user>
• !evolve <name>
• !leaderboard

(More commands available!)
`;
    await sock.sendMessage(ctx.from, { image: { url: config.menuPicUrl }, caption: menuText }, { quoted: msg });
  }
};
