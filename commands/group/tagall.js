export default {
  name: 'tagall',
  description: 'Tag all group members',
  category: 'group',
  aliases: ['all', 'everyone'],
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    if (!jid.endsWith('@g.us')) {
      await sock.sendMessage(jid, { text: '❌ Group only!' }, { quoted: msg });
      return;
    }
    try {
      const meta = await sock.groupMetadata(jid);
      const mentions = meta.participants.map(p => p.id);
      const message = args.join(' ') || 'Attention everyone! 🧛';
      await sock.sendMessage(jid, { text: `📢 *${message}*\n\n⚡ *Powered by Vampire Tech* 🧛`, mentions }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(jid, { text: '❌ Failed to tag members.' }, { quoted: msg });
    }
  }
};
