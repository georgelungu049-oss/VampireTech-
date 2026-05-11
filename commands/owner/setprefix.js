export default {
  name: 'setprefix',
  description: 'Change command prefix',
  category: 'owner',
  aliases: ['prefix'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const newPrefix = args[0];
    if (!newPrefix) return sock.sendMessage(chatId, { text: `.setprefix <prefix>\nCurrent: .\n.setprefix none - No prefix\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    if (newPrefix === 'none') return sock.sendMessage(chatId, { text: `🔓 Prefix removed! Type commands without prefix.\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    await sock.sendMessage(chatId, { text: `✅ Prefix set to: *${newPrefix}*\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
