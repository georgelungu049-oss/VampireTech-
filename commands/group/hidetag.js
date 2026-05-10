export default {
  name: 'hidetag',
  description: 'Send hidden tag message',
  category: 'group',
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    if (!jid.endsWith('@g.us')) {
      return sock.sendMessage(jid, { text: '❌ Group only!' }, { quoted: msg });
    }
    try {
      const metadata = await sock.groupMetadata(jid);
      const members = metadata.participants.map(p => p.id);
      const text = args.join(' ') || '🔔';
      await sock.sendMessage(jid, { text, mentions: members }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(jid, { text: '❌ Failed!' }, { quoted: msg });
    }
  }
};
