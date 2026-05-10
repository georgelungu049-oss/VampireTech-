export default {
  name: 'antidelete',
  description: 'Prevent message deletion',
  category: 'automation',
  aliases: ['antidel', 'nodelete'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const action = args[0]?.toLowerCase() || 'on';
    await sock.sendMessage(chatId, { text: action === 'on' ? '🛡️ *Anti-Delete ENABLED!*\nDeleted messages will be saved.\n\n⚡ *Powered by Vampire Tech* 🧛' : '🛡️ *Anti-Delete DISABLED!*\n\n⚡ *Powered by Vampire Tech* 🧛' }, { quoted: msg });
  }
};
