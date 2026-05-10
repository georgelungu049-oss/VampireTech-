export default {
  name: 'base64',
  description: 'Encode/decode Base64',
  category: 'tools',
  aliases: ['b64', 'encode64'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const action = args[0]?.toLowerCase();
    const text = args.slice(1).join(' ');
    
    if (!action || !text) return sock.sendMessage(chatId, { text: `❌ Use: .base64 encode <text> or .base64 decode <text>` }, { quoted: msg });
    
    if (action === 'encode') {
      const encoded = Buffer.from(text).toString('base64');
      await sock.sendMessage(chatId, { text: `🔐 *Encoded:*\n\`${encoded}\`\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    } else if (action === 'decode') {
      try {
        const decoded = Buffer.from(text, 'base64').toString('utf-8');
        await sock.sendMessage(chatId, { text: `🔓 *Decoded:*\n${decoded}\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
      } catch (e) {
        await sock.sendMessage(chatId, { text: '❌ Invalid Base64!' }, { quoted: msg });
      }
    }
  }
};
