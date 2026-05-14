export default {
  name:'antilink',
  category:'group',
  aliases:['nolink','linkblock'],
  ownerOnly:true,
  async execute(sock, msg, args) {
    const c = msg.key.remoteJid;
    const a = args[0]?.toLowerCase() || 'on';
    if (a === 'on') {
      return sock.sendMessage(c, { text: '🦇 *ANTI-LINK ENABLED!*\nForbidden links will be consumed.\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
    }
    if (a === 'off') {
      return sock.sendMessage(c, { text: '🌑 *ANTI-LINK DISABLED!*\nLinks may pass freely.\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
    }
    return sock.sendMessage(c, { text: '🦇 .antilink on/off\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
  }
};
