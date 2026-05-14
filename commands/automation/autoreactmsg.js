export default { 
  name:'autoreactmsg', 
  category:'automation', 
  aliases:['reactmsg','autoreacttext','reactall'],
  ownerOnly:true,
  async execute(sock, msg, args) { 
    const c = msg.key.remoteJid;
    const a = args[0]?.toLowerCase() || 'on';
    const emoji = args[1] || '🧛';
    
    if (a === 'on') {
      return sock.sendMessage(c, { 
        text: `🦇 *AUTO-REACT MESSAGES ENABLED!*\n\nReacting with: ${emoji}\nChange: .autoreactmsg on ${emoji}\n\n> *Vampire Tech* 🧛` 
      }, { quoted: msg });
    }
    if (a === 'off') {
      return sock.sendMessage(c, { 
        text: '🌑 *AUTO-REACT DISABLED!*\n\n> *Vampire Tech* 🧛' 
      }, { quoted: msg });
    }
    if (a === 'list') {
      return sock.sendMessage(c, { 
        text: `🦇 *REACTION EMOJIS*\n\n👑😊🥺🫀😌🤣🙃♥️🤪😩😔😫\n\nUse: .autoreactmsg on 👑\n\n> *Vampire Tech* 🧛` 
      }, { quoted: msg });
    }
    
    return sock.sendMessage(c, { 
      text: `🦇 *AUTO-REACT MESSAGES*\n\n.autoreactmsg on - Enable\n.autoreactmsg off - Disable\n.autoreactmsg on 👑 - Set emoji\n.autoreactmsg list - Show emojis\n\n> *Vampire Tech* 🧛` 
    }, { quoted: msg });
  } 
};
