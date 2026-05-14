export default {
  name: 'owner',
  category: 'owner',
  aliases: ['creator', 'dev', 'lord', 'paxton'],
  async execute(sock, msg) {
    const c = msg.key.remoteJid;
    
    // Send contact card
    const vcard = 'BEGIN:VCARD\nVERSION:3.0\nFN:Paxton (Vampire Lord)\nORG:Vampire Tech\nTEL;type=CELL:+27704278701\nEND:VCARD';
    
    await sock.sendMessage(c, {
      contacts: {
        displayName: '🧛 Paxton (Vampire Lord)',
        contacts: [{ vcard }]
      }
    }, { quoted: msg });

    // Also send co-owner contact
    const vcard2 = 'BEGIN:VCARD\nVERSION:3.0\nFN:SavageMulla (Co-Owner)\nORG:Vampire Tech\nTEL;type=CELL:+263776699348\nEND:VCARD';
    
    await sock.sendMessage(c, {
      contacts: {
        displayName: '🩸 SavageMulla (Co-Owner)',
        contacts: [{ vcard: vcard2 }]
      }
    }, { quoted: msg });
  }
};
