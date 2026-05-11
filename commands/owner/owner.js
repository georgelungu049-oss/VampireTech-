import fs from 'fs';

function getOwnerName() {
  try { return fs.readFileSync('./data/ownername.txt','utf8').trim(); } catch(e) {}
  return 'Paxton';
}

export default {
  name: 'owner',
  description: 'Show owner contact',
  category: 'owner',
  aliases: ['creator', 'dev', 'paxton'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const ownerName = getOwnerName();
    
    await sock.sendMessage(chatId, { 
      text: `╔══════════════════════════╗\n║   🧛 *VAMPIRE MD OWNER*   ║\n╚══════════════════════════╝\n\n👑 *Owner:* ${ownerName}\n📞 +27 70 427 8701 🇿🇦\n\n🩸 *Co-Owner:* SavageMulla\n📞 +263 77 669 9348 🇿🇼\n\n> *Powered by Vampire Tech*`
    }, { quoted: msg });
  }
};
