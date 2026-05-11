export default {
  name: 'setbio',
  description: 'Change bot WhatsApp bio',
  category: 'settings',
  aliases: ['bio', 'status'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const bio = args.join(' ');
    if (!bio) return sock.sendMessage(chatId, { text: `❌ .setbio <text>\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    try {
      await sock.updateProfileStatus(bio);
      await sock.sendMessage(chatId, { text: `✅ Bio updated!\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    } catch(e) {
      await sock.sendMessage(chatId, { text: '❌ Failed!' }, { quoted: msg });
    }
  }
};
