export default {
  name: 'antiword',
  description: 'Block specific words in group',
  category: 'group',
  aliases: ['badword', 'filterword'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) return sock.sendMessage(chatId, { text: '❌ Group only!' }, { quoted: msg });
    const word = args.join(' ') || 'spam';
    await sock.sendMessage(chatId, { text: `🚫 *Anti-Word Activated!*\nWord: "${word}" will be blocked.\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
