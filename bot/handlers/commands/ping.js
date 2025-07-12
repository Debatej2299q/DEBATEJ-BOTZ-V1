module.exports = {
  name: 'ping',
  category: 'bot',
  description: 'Shows bot latency',
  async execute(sock, msg, args, ctx) {
    const start = Date.now();
    await sock.sendMessage(ctx.from, { text: 'Pinging...' }, { quoted: msg });
    const latency = Date.now() - start;
    await sock.sendMessage(ctx.from, { text: `🏓 Pong!\nLatency: ${latency}ms` }, { quoted: msg });
  }
};
