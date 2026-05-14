export default {
  name:'autoviewstatus',
  category:'automation',
  aliases:['viewstatus','autoseenstatus'],
  ownerOnly:true,
  async execute(sock, msg, args) {
    const c = msg.key.remoteJid;
    const a = args[0]?.toLowerCase() || 'on';
    if (a === 'on') {
      return sock.sendMessage(c, { text: '👁️ *AUTO-VIEW STATUS ENABLED!*\nThe vampire watches all statuses.\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
    }
    if (a === 'off') {
      return sock.sendMessage(c, { text: '🌑 *AUTO-VIEW STATUS DISABLED!*\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
    }
    return sock.sendMessage(c, { text: '👁️ .autoviewstatus on/off\n\n> *Vampire Tech* 🧛' }, { quoted: msg });
  }
};
