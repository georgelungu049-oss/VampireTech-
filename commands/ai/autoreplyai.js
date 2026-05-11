const aiEnabled = new Set();

export default {
  name: 'autoreplyai',
  description: 'AI auto-reply to all messages',
  category: 'ai',
  aliases: ['aiauto', 'aichat'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const action = args[0]?.toLowerCase();
    
    if (action === 'on') {
      aiEnabled.add(chatId);
      return sock.sendMessage(chatId, { text: '🤖 *AI Auto-Reply ENABLED!*\nBot will reply to all messages.\n\n> *Powered by Vampire Tech*' }, { quoted: msg });
    }
    if (action === 'off') {
      aiEnabled.delete(chatId);
      return sock.sendMessage(chatId, { text: '🤖 *AI Auto-Reply DISABLED!*\n\n> *Powered by Vampire Tech*' }, { quoted: msg });
    }
    return sock.sendMessage(chatId, { text: `🤖 *AI Auto-Reply*\n\n${prefix}autoreplyai on\n${prefix}autoreplyai off\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};

export async function handleAiReply(sock, msg) {
  const chatId = msg.key.remoteJid;
  if (!aiEnabled.has(chatId)) return false;
  
  const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
  if (!text || text.startsWith('.')) return false;
  
  try {
    const res = await fetch(`https://apis.xwolf.space/api/ai/groq?q=${encodeURIComponent(text)}`);
    const data = await res.json();
    if (data.status && data.result) {
      await sock.sendMessage(chatId, { text: `🤖 ${data.result}\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
      return true;
    }
  } catch(e) {}
  return false;
}
