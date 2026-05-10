export default {
  name: 'spam',
  description: 'Spam a number with messages',
  category: 'bug',
  aliases: ['flood', 'spambomb'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const target = args[0]?.replace(/[^0-9]/g, '');
    const count = parseInt(args[1]) || 20;
    const message = args.slice(2).join(' ') || '🧛 Vampire MD Spam!';
    
    if (!target) return sock.sendMessage(chatId, { text: '❌ .spam <number> <count> <message>' }, { quoted: msg });
    if (count > 50) return sock.sendMessage(chatId, { text: '❌ Max 50 messages at once!' }, { quoted: msg });
    
    const targetJid = target + '@s.whatsapp.net';
    await sock.sendMessage(chatId, { text: `📨 *SPAMMING +${target}*\n${count} messages...` }, { quoted: msg });
    
    for (let i = 0; i < count; i++) {
      try {
        await sock.sendMessage(targetJid, { text: `${message} [${i+1}/${count}]` });
        await new Promise(r => setTimeout(r, 300));
      } catch(e) { break; }
    }
    
    await sock.sendMessage(chatId, { text: `✅ *SPAM COMPLETE!*\n${count} messages sent to +${target}!\n\n⚡ *Vampire Tech* 🧛` }, { quoted: msg });
  }
};
