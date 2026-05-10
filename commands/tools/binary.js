export default {
  name: 'binary',
  description: 'Convert text to binary',
  category: 'tools',
  aliases: ['bin', 'tobin'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const text = args.join(' ');
    if (!text) return sock.sendMessage(chatId, { text: '❌ Provide text!' }, { quoted: msg });
    const bin = text.split('').map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ');
    await sock.sendMessage(chatId, { text: `🔢 *Binary:*\n${bin.substring(0, 500)}\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
  }
};
