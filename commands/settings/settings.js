export default {
  name: 'settings',
  description: 'Show all bot settings',
  category: 'settings',
  aliases: ['config', 'setup'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, { 
      text: `⚙️ *BOT SETTINGS*\n\n` +
            `📝 ${prefix}setbotname <name>\n` +
            `📝 ${prefix}setfooter <text>\n` +
            `👤 ${prefix}setownername <name>\n` +
            `👤 ${prefix}setcoowner <name>\n` +
            `📞 ${prefix}setownernumber <num>\n` +
            `💬 ${prefix}setprefix <char>\n` +
            `📋 ${prefix}setbio <text>\n` +
            `🎨 ${prefix}menustyle <1-5>\n` +
            `⚙️ ${prefix}mode <public/private>\n\n` +
            `> *Powered by Vampire Tech*`
    }, { quoted: msg });
  }
};
