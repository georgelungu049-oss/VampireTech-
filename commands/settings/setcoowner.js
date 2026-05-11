export default {
  name: 'setcoowner',
  description: 'Change co-owner display name',
  category: 'settings',
  aliases: ['coowner'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const name = args.join(' ');
    if (!name) return sock.sendMessage(chatId, { text: `❌ .setcoowner <name>\nCurrent: SavageMulla\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    await sock.sendMessage(chatId, { text: `✅ Co-Owner name set to: *${name}*\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
