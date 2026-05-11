export default {
  name: 'autofollow',
  description: 'Auto follow channels on startup',
  category: 'automation',
  aliases: ['autochannel', 'followall'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const action = args[0]?.toLowerCase() || 'on';
    await sock.sendMessage(chatId, { text: action === 'on' ? '📢 *Auto-Follow ENABLED!*\nBot will auto-follow configured channels.\n\n> *Powered by Vampire Tech*' : '📢 *Auto-Follow DISABLED!*\n\n> *Powered by Vampire Tech*' }, { quoted: msg });
  }
};
