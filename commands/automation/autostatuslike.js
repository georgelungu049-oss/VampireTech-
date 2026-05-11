export default {
  name: 'autostatuslike',
  description: 'Auto like all statuses',
  category: 'automation',
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, { text: '❤️ Auto-Status Like ENABLED!\n\n> *Powered by Vampire Tech*' }, { quoted: msg });
  }
};
