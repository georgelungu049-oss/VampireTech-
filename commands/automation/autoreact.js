export default { 
  name:'autoreact', 
  category:'automation', 
  aliases:['react','autoreactstatus','sr'],
  ownerOnly:true,
  async execute(sock, msg, args) { 
    const c = msg.key.remoteJid;
    const a = args[0]?.toLowerCase() || 'on';
    
    if (a === 'on' || a === 'enable') {
      return sock.sendMessage(c, { 
        text: '🦇 *AUTO-REACT ENABLED!*\n\nThe vampire will react to all statuses.\n\n> *Vampire Tech* 🧛' 
      }, { quoted: msg });
    }
    if (a === 'off' || a === 'disable') {
      return sock.sendMessage(c, { 
        text: '🌑 *AUTO-REACT DISABLED!*\n\nThe vampire rests.\n\n> *Vampire Tech* 🧛' 
      }, { quoted: msg });
    }
    if (a === 'status') {
      return sock.sendMessage(c, { 
        text: `🦇 *AUTO-REACT STATUS*\n\nCurrently: ACTIVE ✅\n\nCommands:\n.autoreact on\n.autoreact off\n.autoreact status\n\n> *Vampire Tech* 🧛` 
      }, { quoted: msg });
    }
    
    return sock.sendMessage(c, { 
      text: `🦇 *AUTO-REACT*\n\n.autoreact on - Enable\n.autoreact off - Disable\n.autoreact status - Check\n\n> *Vampire Tech* 🧛` 
    }, { quoted: msg });
  } 
};
