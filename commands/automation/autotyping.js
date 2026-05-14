export default {
  name:'autotyping',
  category:'automation',
  aliases:['typing','autotype'],
  ownerOnly:true,
  async execute(sock, msg, args) {
    const c = msg.key.remoteJid;
    const a = args[0]?.toLowerCase() || 'on';
    if (a === 'on') {
      await sock.sendPresenceUpdate('composing', c);
      return sock.sendMessage(c, { text: '⌨️ *Typing indicator shown!*\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
    }
    if (a === 'off') {
      await sock.sendPresenceUpdate('paused', c);
      return sock.sendMessage(c, { text: '⌨️ *Typing indicator stopped!*\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
    }
    return sock.sendMessage(c, { text: '⌨️ .autotyping on/off\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
  }
};
