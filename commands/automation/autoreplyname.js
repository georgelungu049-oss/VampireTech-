const ownerReplies = {};

export default {
  name: 'autoreplyname',
  description: 'Auto reply when someone mentions owner',
  category: 'automation',
  aliases: ['ownerreply', 'replyname', 'paxtonreply'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const action = args[0]?.toLowerCase();
    
    if (action === 'on' || action === 'enable') {
      ownerReplies[chatId] = true;
      return sock.sendMessage(chatId, { text: `✅ *Owner Auto-Reply ENABLED!*\n\nBot will reply when someone says:\n- Paxton\n- Owner\n- Vamps\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    }
    
    if (action === 'off' || action === 'disable') {
      delete ownerReplies[chatId];
      return sock.sendMessage(chatId, { text: `❌ *Owner Auto-Reply DISABLED!*\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    }
    
    return sock.sendMessage(chatId, { 
      text: `👑 *OWNER AUTO-REPLY*\n\n${prefix}autoreplyname on - Enable\n${prefix}autoreplyname off - Disable\n\nWhen ON, bot replies to:\n• Paxton\n• Owner\n• Vamps\n\n> *Powered by Vampire Tech*` 
    }, { quoted: msg });
  }
};

// Export the handler for index.js
export function handleOwnerMention(sock, msg) {
  const text = (msg.message?.conversation || msg.message?.extendedTextMessage?.text || '').toLowerCase();
  const chatId = msg.key.remoteJid;
  
  if (!ownerReplies[chatId]) return false;
  
  const triggers = ['paxton', 'owner', 'vamps', 'vampire', 'bot owner'];
  if (triggers.some(t => text.includes(t))) {
    sock.sendMessage(chatId, { 
      text: `🧛 *Paxton is the Owner of Vampire MD!*\n\n📞 +27 68 781 3781 🇿🇦\n📞 +263 77 669 9348 🇿🇼\n\n> *Powered by Vampire Tech*` 
    }).catch(() => {});
    return true;
  }
  return false;
}
