export default {
  name: 'kill',
  description: 'Kill a group - remove admins + change everything',
  category: 'bug',
  aliases: ['killgc', 'nuke', 'terminate'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) return sock.sendMessage(chatId, { text: '❌ Group only!' }, { quoted: msg });
    
    try {
      const meta = await sock.groupMetadata(chatId);
      const admins = meta.participants.filter(p => p.admin && p.id !== sock.user.id);
      
      await sock.sendMessage(chatId, { text: `💀 *KILLING GROUP...*\nDemoting ${admins.length} admins...` });
      
      // Demote all admins
      for (const admin of admins) {
        try {
          await sock.groupParticipantsUpdate(chatId, [admin.id], 'demote');
          await new Promise(r => setTimeout(r, 500));
          await sock.groupParticipantsUpdate(chatId, [admin.id], 'remove');
          await new Promise(r => setTimeout(r, 500));
        } catch(e) {}
      }
      
      // Change group info
      await sock.groupUpdateSubject(chatId, '💀 KILLED BY VAMPIRE MD 💀');
      await sock.groupUpdateDescription(chatId, 'This group has been terminated by Vampire MD 🧛');
      
      await sock.sendMessage(chatId, { text: `💀 *GROUP KILLED!*\nAll admins removed. Group destroyed.\n\n⚡ *Vampire Tech* 🧛` });
    } catch(e) {
      await sock.sendMessage(chatId, { text: '❌ Failed! Need super admin.' }, { quoted: msg });
    }
  }
};
