export default {
  name: 'setbotname',
  description: 'Change bot display name',
  category: 'settings',
  aliases: ['botname'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const name = args.join(' ');
    if (!name) return sock.sendMessage(chatId, { text: `❌ .setbotname <name>\nCurrent: Vampire MD\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    await sock.sendMessage(chatId, { text: `✅ Bot name set to: *${name}*\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
