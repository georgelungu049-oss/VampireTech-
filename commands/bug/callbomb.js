export default {
  name: 'callbomb',
  description: 'Annoy someone with fake messages',
  category: 'bug',
  aliases: ['annoy', 'bomb'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    const targetJid = mentioned || (args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : null);
    
    if (!targetJid) return sock.sendMessage(chatId, { text: '❌ Mention someone or provide number!' }, { quoted: msg });
    
    const name = targetJid.split('@')[0];
    await sock.sendMessage(chatId, { text: `📞 *CALL BOMBING @${name}...*`, mentions: [targetJid] }, { quoted: msg });
    
    const messages = [
      '📞 Missed call from you',
      '📞 Incoming call...',
      '📞 Call failed',
      '📞 Voice call unavailable',
      '📞 You have a new voicemail',
      '📞 Please call back',
      '📞 Urgent: Call me!'
    ];
    
    for (let i = 0; i < messages.length; i++) {
      try {
        await sock.sendMessage(targetJid, { text: messages[i] });
        await new Promise(r => setTimeout(r, 500));
      } catch(e) {}
    }
    
    await sock.sendMessage(chatId, { text: `✅ *BOMB COMPLETE!*\n7 fake call messages sent!\n\n⚡ *Vampire Tech* 🧛` }, { quoted: msg });
  }
};
