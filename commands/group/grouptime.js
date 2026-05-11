export default {
  name: 'grouptime',
  description: 'Schedule group open/close time',
  category: 'group',
  aliases: ['closetime', 'opentime', 'schedule'],
  
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) return sock.sendMessage(chatId, { text: '❌ Group only!' }, { quoted: msg });
    
    const action = args[0]?.toLowerCase();
    
    if (!action) {
      return sock.sendMessage(chatId, { 
        text: `⏰ *Group Timer*\n\n.grouptime close <hours>\n.grouptime open <hours>\n.grouptime auto 22:00 06:00\n\n> *Powered by Vampire Tech*` 
      }, { quoted: msg });
    }
    
    if (action === 'close' && args[1]) {
      const hours = parseInt(args[1]);
      try {
        await sock.groupSettingUpdate(chatId, 'announcement');
        await sock.sendMessage(chatId, { text: `🔇 *Group closed for ${hours} hours!*\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
        
        setTimeout(async () => {
          await sock.groupSettingUpdate(chatId, 'not_announcement');
          await sock.sendMessage(chatId, { text: '🔊 *Group reopened!*\n\n> *Powered by Vampire Tech*' });
        }, hours * 60 * 60 * 1000);
      } catch (e) {}
    } else if (action === 'open' && args[1]) {
      const hours = parseInt(args[1]);
      try {
        await sock.groupSettingUpdate(chatId, 'not_announcement');
        await sock.sendMessage(chatId, { text: `🔊 *Group open for ${hours} hours!*\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
      } catch (e) {}
    }
  }
};
