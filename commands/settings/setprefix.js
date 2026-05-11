export default {
  name: 'setprefix',
  description: 'Change command prefix',
  category: 'settings',
  aliases: ['prefix'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const prefix = args[0];
    if (!prefix) return sock.sendMessage(chatId, { text: `❌ .setprefix <prefix>\nCurrent: .\n\n.setprefix none - No prefix\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    if (prefix === 'none') return sock.sendMessage(chatId, { text: `✅ Prefix removed! Prefixless mode.\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    if (prefix.length > 3) return sock.sendMessage(chatId, { text: '❌ Max 3 characters!' }, { quoted: msg });
    await sock.sendMessage(chatId, { text: `✅ Prefix set to: *${prefix}*\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
