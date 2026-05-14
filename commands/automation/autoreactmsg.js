export default { 
  name:'autoreactmsg', 
  category:'automation', 
  aliases:['reactmsg','autoreacttext','reactall'],
  ownerOnly:true,
  async execute(sock, msg, args) { 
    const c = msg.key.remoteJid;
    const a = args[0]?.toLowerCase() || 'on';
    const emoji = args[1] || '🧛';
    
    if (a === 'on' || a === 'enable') {
      return sock.sendMessage(c, { 
        text: `🦇 *AUTO-REACT MESSAGES ENABLED!*\n\nThe vampire will react with ${emoji} to ALL messages.\n\n> *Vampire Tech* 🧛` 
      }, { quoted: msg });
    }
    if (a === 'off' || a === 'disable') {
      return sock.sendMessage(c, { 
        text: '🌑 *AUTO-REACT MESSAGES DISABLED!*\n\nThe vampire stops reacting.\n\n> *Vampire Tech* 🧛' 
      }, { quoted: msg });
    }
    
    return sock.sendMessage(c, { 
      text: `🦇 *AUTO-REACT MESSAGES*\n\n.autoreactmsg on - Enable\n.autoreactmsg off - Disable\n.autoreactmsg on 🧛 - Set emoji\n\n> *Vampire Tech* 🧛` 
    }, { quoted: msg });
  } 
};
