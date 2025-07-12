const { User } = require('../../db');
const config = require('../../config');

module.exports = {
  handle: async (sock, update) => {
    const groupId = update.id;
    if (update.action === 'add') {
      for (const participant of update.participants) {
        if (groupId === config.mainGroupId) {
          await sock.sendMessage(groupId, {
            text: `Welcome @${participant.split('@')[0]} to the group!\nPlease introduce yourself with !intro`,
            mentions: [participant]
          });
        }
      }
    }
    // Other event handling...
  }
};
