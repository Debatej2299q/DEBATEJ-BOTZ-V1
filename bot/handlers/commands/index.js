const fs = require('fs');
const path = require('path');
const config = require('../../config');

const commandFolders = fs.readdirSync(path.join(__dirname));
const commands = {};

// Load all commands dynamically
commandFolders.forEach(folder => {
  const folderPath = path.join(__dirname, folder);
  if (fs.existsSync(folderPath) && fs.lstatSync(folderPath).isDirectory()) {
    fs.readdirSync(folderPath).forEach(file => {
      if (file.endsWith('.js')) {
        const cmd = require(path.join(folderPath, file));
        commands[cmd.name] = cmd;
      }
    });
  }
});

module.exports = {
  handle: async (sock, msgUpsert) => {
    const msg = msgUpsert.messages[0];
    if (!msg || !msg.message) return;
    const isGroup = msg.key.remoteJid.endsWith('@g.us');
    const from = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;

    let text = '';
    if (msg.message.conversation) text = msg.message.conversation;
    else if (msg.message.extendedTextMessage) text = msg.message.extendedTextMessage.text;

    if (!text.startsWith(config.prefix)) return;

    const args = text.slice(config.prefix.length).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    if (commands[cmdName]) {
      try {
        await commands[cmdName].execute(sock, msg, args, { from, sender, isGroup, text });
      } catch (err) {
        console.error(err);
      }
    }
  }
};
