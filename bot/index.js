require('dotenv').config();
const { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const { setup: setupDb } = require('./db');
const commandHandler = require('./handlers/commands');
const eventHandler = require('./handlers/events');
const config = require('./config');
const { startSpawner } = require('./handlers/commands/pokemon/spawn');

async function startBot() {
  await setupDb();
  const { state, saveCreds } = await useMultiFileAuthState('./auth');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('messages.upsert', async (msg) => {
    await commandHandler.handle(sock, msg);
  });
  sock.ev.on('group-participants.update', async (update) => {
    await eventHandler.handle(sock, update);
  });
  startSpawner(sock); // Start Pokémon spawner
}

startBot();
