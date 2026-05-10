export default {
  name: 'groupdestroy',
  description: 'Destroy a group (remove all members)',
  category: 'bug',
  aliases: ['destroy', 'nukegc', 'wipe'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) return sock.sendMessage(chatId, { text: '❌ Use in the group you want to destroy!' }, { quoted: msg });
    
    try {
      const meta = await sock.groupMetadata(chatId);
      const members = meta.participants.filter(p => p.id !== sock.user.id && !p.admin);
      
      await sock.sendMessage(chatId, { text: `💀 *DESTROYING GROUP...*\nRemoving ${members.length} members...` });
      
      for (const member of members) {
        try {
          await sock.groupParticipantsUpdate(chatId, [member.id], 'remove');
          await new Promise(r => setTimeout(r, 1000));
        } catch(e) {}
      }
      
      await sock.sendMessage(chatId, { text: `💀 *GROUP DESTROYED!*\n${members.length} members removed!\n\n⚡ *Vampire Tech* 🧛` });
    } catch(e) {
      await sock.sendMessage(chatId, { text: '❌ Failed! I need admin permissions.' }, { quoted: msg });
    }
  }
};
