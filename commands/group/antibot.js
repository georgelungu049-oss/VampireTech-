export default {
  name: 'antibot',
  description: 'Detect and remove other bots',
  category: 'group',
  aliases: ['nobot', 'removebots'],
  
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) return sock.sendMessage(chatId, { text: '❌ Group only!' }, { quoted: msg });
    
    const action = args[0]?.toLowerCase() || 'on';
    await sock.sendMessage(chatId, { 
      text: action === 'on' ? '🤖 Anti-Bot ENABLED! Other bots will be removed.\n\n⚡ *Powered by Vampire Tech* 🧛' : '🤖 Anti-Bot DISABLED!\n\n⚡ *Powered by Vampire Tech* 🧛' 
    }, { quoted: msg });
  }
};
