export default {
  name: 'ghost',
  description: 'Ghost mode - members cant send messages',
  category: 'bug',
  aliases: ['ghostmode', 'shadowban', 'silenceall'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) return sock.sendMessage(chatId, { text: '❌ Group only!' }, { quoted: msg });
    
    const action = args[0]?.toLowerCase() || 'on';
    
    try {
      if (action === 'on') {
        await sock.groupSettingUpdate(chatId, 'locked');
        await sock.groupSettingUpdate(chatId, 'announcement');
        await sock.sendMessage(chatId, { text: `👻 *GHOST MODE ON!*\nOnly admins can send messages.\nGroup is now a ghost town!\n\n⚡ *Vampire Tech* 🧛` });
      } else {
        await sock.groupSettingUpdate(chatId, 'unlocked');
        await sock.groupSettingUpdate(chatId, 'not_announcement');
        await sock.sendMessage(chatId, { text: `👻 *GHOST MODE OFF!*\nMembers can talk again.\n\n⚡ *Vampire Tech* 🧛` });
      }
    } catch(e) {
      await sock.sendMessage(chatId, { text: '❌ Failed! Need admin.' }, { quoted: msg });
    }
  }
};
