export default {
  name: 'reverse',
  description: 'Reverse text',
  category: 'tools',
  aliases: ['rev', 'backwards'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const text = args.join(' ');
    if (!text) return sock.sendMessage(chatId, { text: '❌ Provide text!' }, { quoted: msg });
    const reversed = text.split('').reverse().join('');
    await sock.sendMessage(chatId, { text: `🔄 *Reversed:*\n${reversed}\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
  }
};
