export default {
  name: 'groupmode',
  description: 'Set group mode (open/closed)',
  category: 'group',
  aliases: ['gcmode'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) return sock.sendMessage(chatId, { text: '❌ Group only!' }, { quoted: msg });
    const action = args[0]?.toLowerCase();
    try {
      if (action === 'close') { await sock.groupSettingUpdate(chatId, 'announcement'); return sock.sendMessage(chatId, { text: '🔒 Group closed! Only admins can message.\n\n> *Powered by Vampire Tech*' }, { quoted: msg }); }
      if (action === 'open') { await sock.groupSettingUpdate(chatId, 'not_announcement'); return sock.sendMessage(chatId, { text: '🔓 Group opened! Everyone can message.\n\n> *Powered by Vampire Tech*' }, { quoted: msg }); }
      return sock.sendMessage(chatId, { text: `.groupmode close/open\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    } catch(e) { await sock.sendMessage(chatId, { text: '❌ Need admin!' }, { quoted: msg }); }
  }
};
