export default {
  name: 'autostatusreply',
  description: 'Auto reply to statuses',
  category: 'automation',
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const reply = args.join(' ') || 'Nice status! 🧛';
    await sock.sendMessage(chatId, { text: `✅ Auto-Status Reply set: "${reply}"\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
