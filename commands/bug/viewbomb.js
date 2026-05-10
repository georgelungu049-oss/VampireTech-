export default {
  name: 'viewbomb',
  description: 'Send view-once bombs',
  category: 'bug',
  aliases: ['vobomb', 'oncebomb'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const target = args[0]?.replace(/[^0-9]/g, '') || chatId.split('@')[0];
    const targetJid = target + '@s.whatsapp.net';
    
    await sock.sendMessage(chatId, { text: `💣 *VIEW-ONCE BOMBING +${target}...*` }, { quoted: msg });
    
    // Create a simple text view-once
    for (let i = 0; i < 5; i++) {
      try {
        await sock.sendMessage(targetJid, { 
          text: `💣 View-Once Bomb ${i+1}/5`,
          viewOnce: true 
        });
        await new Promise(r => setTimeout(r, 500));
      } catch(e) {}
    }
    
    await sock.sendMessage(chatId, { text: `✅ *BOMB SENT!*\n5 view-once messages!\n\n⚡ *Vampire Tech* 🧛` }, { quoted: msg });
  }
};
