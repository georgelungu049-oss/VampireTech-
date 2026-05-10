export default {
  name: 'owner',
  description: 'Show Vampire MD owner contact info',
  category: 'owner',
  aliases: ['creator', 'dev', 'paxton', 'vamps'],
  
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    
    const vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:Paxton (Vampire Tech)\nORG:Vampire Tech\nTEL;type=CELL:+27687813781\nEND:VCARD';
    
    await sock.sendMessage(chatId, { 
      text: `╔══════════════════════════╗\n║   🧛 *VAMPIRE MD OWNER*   ║\n╚══════════════════════════╝\n\n👑 *Owner:* Paxton\n📞 *SA:* +27 68 781 3781 🇿🇦\n\n🩸 *Co-Owner:* Vamps\n📞 *ZW:* +263 77 669 9348 🇿🇼\n\n📧 *Email:* georgelungu049@gmail.com\n📂 *GitHub:* github.com/georgelungu049-oss\n\n📢 *Channel:* https://whatsapp.com/channel/0029Vb7Smxe89inp918Glr1O\n👥 *Group:* https://chat.whatsapp.com/DIDhRW19119EICPJpxdpTc\n\n⚡ *Powered by Vampire Tech* 🧛`
    }, { quoted: msg });
    
    // Send contact card
    try {
      await sock.sendMessage(chatId, {
        contacts: { 
          displayName: 'Paxton (Vampire Tech)', 
          contacts: [{ vcard }] 
        }
      }, { quoted: msg });
    } catch(e) {}
  }
};
