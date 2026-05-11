export default {
  name: 'owner',
  description: 'Show owner contact',
  category: 'owner',
  aliases: ['creator', 'dev', 'paxton'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    
    const vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:Paxton (Vampire Tech)\nORG:Vampire Tech\nTEL;type=CELL:+27704278701\nEND:VCARD';
    
    await sock.sendMessage(chatId, { 
      text: `╔══════════════════════════╗\n║   🧛 *VAMPIRE MD OWNER*   ║\n╚══════════════════════════╝\n\n👑 *Owner:* Paxton\n📞 +27 70 427 8701 🇿🇦\n\n🩸 *Co-Owner:* SavageMulla\n📞 +263 77 669 9348 🇿🇼\n\n> *Powered by Vampire Tech*`
    }, { quoted: msg });
    
    try {
      await sock.sendMessage(chatId, {
        contacts: { displayName: 'Paxton (Owner)', contacts: [{ vcard }] }
      }, { quoted: msg });
    } catch(e) {}
  }
};
