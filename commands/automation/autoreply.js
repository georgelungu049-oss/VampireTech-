const autoReplies = new Map();

export default {
  name: 'autoreply',
  description: 'Set auto-reply messages',
  category: 'automation',
  aliases: ['setreply', 'automsg'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const action = args[0]?.toLowerCase();
    
    if (action === 'set') {
      const trigger = args[1]?.toLowerCase();
      const reply = args.slice(2).join(' ');
      if (!trigger || !reply) return sock.sendMessage(chatId, { 
        text: `❌ ${prefix}autoreply set <trigger> <reply>\nExample: .autoreply set hello Hey! I'm busy right now.` 
      }, { quoted: msg });
      autoReplies.set(trigger, reply);
      return sock.sendMessage(chatId, { text: `✅ Auto-reply set!\n"${trigger}" → "${reply}"\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    }
    
    if (action === 'list') {
      if (autoReplies.size === 0) return sock.sendMessage(chatId, { text: 'No auto-replies set.' }, { quoted: msg });
      let list = '📋 *Auto-Replies*\n\n';
      autoReplies.forEach((reply, trigger) => { list += `"${trigger}" → "${reply}"\n`; });
      return sock.sendMessage(chatId, { text: list + '\n> *Powered by Vampire Tech*' }, { quoted: msg });
    }
    
    if (action === 'del') {
      const trigger = args[1]?.toLowerCase();
      autoReplies.delete(trigger);
      return sock.sendMessage(chatId, { text: `✅ Deleted auto-reply for "${trigger}"\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    }
    
    return sock.sendMessage(chatId, { 
      text: `💬 *Auto-Reply*\n\n${prefix}autoreply set hi Hello!\n${prefix}autoreply list\n${prefix}autoreply del hi\n\n> *Powered by Vampire Tech*` 
    }, { quoted: msg });
  }
};

export async function handleAutoReply(sock, msg) {
  const text = (msg.message?.conversation || msg.message?.extendedTextMessage?.text || '').toLowerCase();
  if (!text || text.startsWith('.')) return false;
  
  for (const [trigger, reply] of autoReplies) {
    if (text.includes(trigger)) {
      await sock.sendMessage(msg.key.remoteJid, { 
        text: `💬 ${reply}\n\n> *Powered by Vampire Tech*` 
      }, { quoted: msg });
      return true;
    }
  }
  return false;
}
