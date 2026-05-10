const antiDeleteEnabled = new Set();

export default {
  name: 'antidelete',
  description: 'Recover deleted messages',
  category: 'automation',
  aliases: ['antidel', 'recovermsg', 'nodelete'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const action = args[0]?.toLowerCase() || 'on';
    
    if (action === 'on') {
      antiDeleteEnabled.add(chatId);
      return sock.sendMessage(chatId, { text: '🛡️ *Anti-Delete ENABLED!*\nDeleted messages will be recovered.\n\n⚡ *Vampire Tech* 🧛' }, { quoted: msg });
    }
    if (action === 'off') {
      antiDeleteEnabled.delete(chatId);
      return sock.sendMessage(chatId, { text: '🛡️ *Anti-Delete DISABLED!*\n\n⚡ *Vampire Tech* 🧛' }, { quoted: msg });
    }
    return sock.sendMessage(chatId, { text: `🛡️ *Anti-Delete*\n\n${prefix}antidelete on/off\n\n⚡ *Vampire Tech* 🧛` }, { quoted: msg });
  }
};
