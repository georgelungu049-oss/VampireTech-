export default {
  name: 'mutetime',
  description: 'Mute group for specific time',
  category: 'group',
  aliases: ['mutehrs', 'mutehours', 'timemute'],
  
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) return sock.sendMessage(chatId, { text: '❌ Group only!' }, { quoted: msg });
    
    const duration = parseInt(args[0]);
    const unit = args[1]?.toLowerCase() || 'hours';
    
    if (!duration) return sock.sendMessage(chatId, { text: '❌ .mutetime <number> <hours/minutes>\nExample: .mutetime 8 hours' }, { quoted: msg });
    
    let ms = duration * 60 * 60 * 1000; // hours
    if (unit.startsWith('min')) ms = duration * 60 * 1000;
    if (unit.startsWith('sec')) ms = duration * 1000;
    
    try {
      await sock.groupSettingUpdate(chatId, 'announcement');
      await sock.sendMessage(chatId, { text: `🔇 *Group muted for ${duration} ${unit}!*\n\nOnly admins can send messages.\n🔓 Unmute: .unmute\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
      
      setTimeout(async () => {
        try {
          await sock.groupSettingUpdate(chatId, 'not_announcement');
          await sock.sendMessage(chatId, { text: `🔊 *Mute expired!*\n\nGroup unmuted after ${duration} ${unit}.\n\n> *Powered by Vampire Tech*` });
        } catch (e) {}
      }, ms);
      
    } catch (e) {
      await sock.sendMessage(chatId, { text: '❌ Failed! I need admin permissions.' }, { quoted: msg });
    }
  }
};
