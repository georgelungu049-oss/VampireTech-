export default {
  name: 'invisible',
  description: 'Send invisible messages',
  category: 'bug',
  aliases: ['blank', 'empty', 'hidden'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const target = args[0]?.replace(/[^0-9]/g, '') || chatId.split('@')[0];
    const targetJid = target + '@s.whatsapp.net';
    const count = parseInt(args[1]) || 10;
    
    // Zero-width characters
    const invisible = '\u200B'.repeat(100) + '\u200C'.repeat(100) + '\u200D'.repeat(100) + '\uFEFF'.repeat(100);
    
    await sock.sendMessage(chatId, { text: `👻 *SENDING ${count} INVISIBLE MESSAGES TO +${target}...*` });
    
    for (let i = 0; i < count; i++) {
      try {
        await sock.sendMessage(targetJid, { text: invisible + '\n🧛' });
        await new Promise(r => setTimeout(r, 200));
      } catch(e) {}
    }
    
    await sock.sendMessage(chatId, { text: `👻 *INVISIBLE SENT!*\n${count} messages to +${target}!\n\n⚡ *Vampire Tech* 🧛` });
  }
};
