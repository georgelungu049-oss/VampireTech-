export default {
  name:'autorecording',
  category:'automation',
  aliases:['recording','autorec'],
  ownerOnly:true,
  async execute(sock, msg, args) {
    const c = msg.key.remoteJid;
    const a = args[0]?.toLowerCase() || 'on';
    if (a === 'on') {
      await sock.sendPresenceUpdate('recording', c);
      return sock.sendMessage(c, { text: '🎙️ *Recording indicator shown!*\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
    }
    if (a === 'off') {
      await sock.sendPresenceUpdate('paused', c);
      return sock.sendMessage(c, { text: '🎙️ *Recording indicator stopped!*\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
    }
    return sock.sendMessage(c, { text: '🎙️ .autorecording on/off\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
  }
};
