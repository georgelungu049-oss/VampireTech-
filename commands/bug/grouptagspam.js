export default {
  name: 'grouptagspam',
  description: 'Spam tag all members continuously',
  category: 'bug',
  aliases: ['tagspam', 'spamtag', 'annoyall'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) return sock.sendMessage(chatId, { text: '❌ Group only!' }, { quoted: msg });
    
    const count = parseInt(args[0]) || 5;
    if (count > 10) return sock.sendMessage(chatId, { text: '❌ Max 10 rounds!' }, { quoted: msg });
    
    const meta = await sock.groupMetadata(chatId);
    const mentions = meta.participants.map(p => p.id);
    
    await sock.sendMessage(chatId, { text: `📢 *TAG SPAM STARTING!*\n${count} rounds...` });
    
    for (let i = 0; i < count; i++) {
      try {
        await sock.sendMessage(chatId, { 
          text: `📢 TAG SPAM ROUND ${i+1}/${count}\n${mentions.map(m => '@'+m.split('@')[0]).join(' ')}`,
          mentions 
        });
        await new Promise(r => setTimeout(r, 500));
      } catch(e) {}
    }
    
    await sock.sendMessage(chatId, { text: `✅ *TAG SPAM COMPLETE!*\n${count} rounds done!\n\n⚡ *Vampire Tech* 🧛` });
  }
};
