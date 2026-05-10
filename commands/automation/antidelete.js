export default {
  name: 'antidelete',
  description: 'Anti-delete messages',
  category: 'automation',
  aliases: ['antidel', 'antideletemsg'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const action = args[0]?.toLowerCase();
    if (action === 'on') {
      await sock.sendMessage(chatId, { text: '🛡️ Anti-delete ENABLED! Deleted messages will be recovered.\n\n⚡ *Powered by Vampire Tech* 🧛' }, { quoted: msg });
    } else {
      await sock.sendMessage(chatId, { text: `🛡️ *Anti-Delete*\n\n.antidelete on - Enable\n.antidelete off - Disable\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    }
  }
};
