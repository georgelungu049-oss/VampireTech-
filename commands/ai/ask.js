export default {
  name: 'ask',
  description: 'Ask AI anything quickly',
  category: 'ai',
  aliases: ['q', 'question'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const q = args.join(' ');
    if (!q) return sock.sendMessage(chatId, { text: '❌ .ask <question>' }, { quoted: msg });
    
    try {
      const res = await fetch(`https://apis.xwolf.space/api/ai/groq?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      await sock.sendMessage(chatId, { text: `🤖 ${data.result}\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    } catch(e) {
      await sock.sendMessage(chatId, { text: '❌ Failed!' }, { quoted: msg });
    }
  }
};
