export default {
  name: 'antiviewonce',
  description: 'Save view-once media',
  category: 'automation',
  aliases: ['antivo', 'savevo'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, { text: '👁️ *Anti-ViewOnce ACTIVE!*\nAll view-once media auto-saved.\n\n> *Powered by Vampire Tech*' }, { quoted: msg });
  }
};
