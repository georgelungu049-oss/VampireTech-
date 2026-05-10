export default {
  name: 'antilink',
  description: 'Block/remove WhatsApp links in group',
  category: 'group',
  aliases: ['antilinkgc', 'nolink'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) return sock.sendMessage(chatId, { text: '❌ Group only!' }, { quoted: msg });
    const action = args[0]?.toLowerCase() || 'on';
    await sock.sendMessage(chatId, { text: action === 'on' ? '🔗 *Anti-Link ENABLED!*\nAll WhatsApp links will be deleted.\n\n⚡ *Powered by Vampire Tech* 🧛' : '🔗 *Anti-Link DISABLED!*\n\n⚡ *Powered by Vampire Tech* 🧛' }, { quoted: msg });
  }
};
