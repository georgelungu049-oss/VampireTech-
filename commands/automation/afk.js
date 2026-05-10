export default {
  name: 'afk',
  description: 'Set AFK away message',
  category: 'automation',
  aliases: ['away', 'busy', 'offline'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const reason = args.join(' ') || 'I am currently away. Will reply soon!';
    await sock.sendMessage(chatId, { 
      text: `💤 *AFK Mode Activated!*\n\n📝 Reason: ${reason}\n\nI will auto-reply to anyone who messages you.\n\n⚡ *Powered by Vampire Tech* 🧛` 
    }, { quoted: msg });
  }
};
