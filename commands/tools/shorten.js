export default {
  name: 'shorten',
  description: 'Shorten a long URL',
  category: 'tools',
  aliases: ['shorturl', 'tinyurl'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const url = args[0];
    if (!url) return sock.sendMessage(chatId, { text: '❌ Provide a URL!' }, { quoted: msg });
    try {
      const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      const short = await res.text();
      await sock.sendMessage(chatId, { text: `🔗 *Shortened URL*\n\n${short}\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(chatId, { text: '❌ Failed to shorten!' }, { quoted: msg });
    }
  }
};
