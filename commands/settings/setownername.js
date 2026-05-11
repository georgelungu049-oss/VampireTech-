export default {
  name: 'setownername',
  description: 'Change owner display name',
  category: 'settings',
  aliases: ['ownername'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const name = args.join(' ');
    if (!name) return sock.sendMessage(chatId, { text: `❌ .setownername <name>\nCurrent: Paxton\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    await sock.sendMessage(chatId, { text: `✅ Owner name set to: *${name}*\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
