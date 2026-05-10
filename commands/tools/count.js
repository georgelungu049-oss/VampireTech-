export default {
  name: 'count',
  description: 'Count words and characters',
  category: 'tools',
  aliases: ['wc', 'wordcount', 'charcount'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const text = args.join(' ');
    if (!text) return sock.sendMessage(chatId, { text: '❌ Provide text!' }, { quoted: msg });
    const chars = text.length;
    const words = text.split(/\s+/).filter(w => w).length;
    const lines = text.split('\n').length;
    await sock.sendMessage(chatId, { text: `📊 *Text Stats*\n\n📝 Words: ${words}\n🔤 Chars: ${chars}\n📄 Lines: ${lines}\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
  }
};
