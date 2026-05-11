export default {
  name: 'imagine',
  description: 'Generate AI image from text',
  category: 'ai',
  aliases: ['img', 'draw', 'generate'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const prompt = args.join(' ');
    
    if (!prompt) return sock.sendMessage(chatId, { text: '❌ .imagine <description>\nExample: .imagine a vampire in a dark castle' }, { quoted: msg });
    
    try {
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512`;
      await sock.sendMessage(chatId, { 
        image: { url: imageUrl }, 
        caption: `🎨 *AI Imagine*\n📝 ${prompt}\n\n> *Powered by Vampire Tech*`
      }, { quoted: msg });
    } catch(e) {
      await sock.sendMessage(chatId, { text: '❌ Failed to generate image!' }, { quoted: msg });
    }
  }
};
