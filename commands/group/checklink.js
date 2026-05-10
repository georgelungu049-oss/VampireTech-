export default {
  name: 'checklink',
  description: 'Check WhatsApp group link info',
  category: 'group',
  aliases: ['linkinfo', 'grouplinkinfo'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const link = args[0];
    if (!link) return sock.sendMessage(chatId, { text: '❌ Provide a group link!' }, { quoted: msg });
    try {
      const code = link.split('/').pop();
      const info = await sock.groupGetInviteInfo(code);
      await sock.sendMessage(chatId, { 
        text: `🔗 *Group Info*\n📛 ${info.subject}\n👥 ${info.size || 'Unknown'} members\n📅 ${info.creation ? new Date(info.creation*1000).toLocaleDateString() : 'Unknown'}\n\n⚡ *Vampire Tech* 🧛` 
      }, { quoted: msg });
    } catch (e) { await sock.sendMessage(chatId, { text: '❌ Invalid link!' }, { quoted: msg }); }
  }
};
