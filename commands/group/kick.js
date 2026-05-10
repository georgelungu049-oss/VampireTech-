export default {
  name: 'kick',
  description: 'Remove a member from group',
  category: 'group',
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    if (!jid.endsWith('@g.us')) {
      await sock.sendMessage(jid, { text: '❌ Group only!' }, { quoted: msg });
      return;
    }
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const mentions = ctx?.mentionedJid;
    let target = null;
    if (mentions?.length) target = mentions[0];
    if (!target) {
      await sock.sendMessage(jid, { text: '⚠️ Mention the member to kick.' }, { quoted: msg });
      return;
    }
    try {
      await sock.groupParticipantsUpdate(jid, [target], 'remove');
      await sock.sendMessage(jid, { text: `✅ Removed from group!`, mentions: [target] }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(jid, { text: '❌ Failed to kick.' }, { quoted: msg });
    }
  }
};
