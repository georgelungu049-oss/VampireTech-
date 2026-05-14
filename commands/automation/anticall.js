export default {
  name:'anticall',
  category:'automation',
  aliases:['rejectcall','nocall'],
  ownerOnly:true,
  async execute(sock, msg, args) {
    const c = msg.key.remoteJid;
    const a = args[0]?.toLowerCase() || 'on';
    if (a === 'on') {
      return sock.sendMessage(c, { text: '📵 *ANTI-CALL ENABLED!*\nCalls will be rejected automatically.\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
    }
    if (a === 'off') {
      return sock.sendMessage(c, { text: '📞 *ANTI-CALL DISABLED!*\nCalls may come through.\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
    }
    return sock.sendMessage(c, { text: '📵 .anticall on/off\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
  }
};
