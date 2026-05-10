export default {
  name: 'togglereact',
  description: 'Toggle auto-react on/off',
  category: 'automation',
  aliases: ['reacttoggle', 'switchreact'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, { text: '🔄 Auto-React toggled!\n\n⚡ *Powered by Vampire Tech* 🧛' }, { quoted: msg });
  }
};
