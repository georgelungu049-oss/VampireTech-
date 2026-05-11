export default {
  name: 'setfooter',
  description: 'Change bot footer text',
  category: 'settings',
  aliases: ['footer'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const footer = args.join(' ');
    if (!footer) return sock.sendMessage(chatId, { text: `❌ .setfooter <text>\nCurrent: > *Powered by Vampire Tech*\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    await sock.sendMessage(chatId, { text: `✅ Footer set to:\n${footer}\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
