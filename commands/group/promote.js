export default {
  name: 'promote',
  description: 'Promote a member to admin',
  category: 'group',
  async execute(sock, msg, args) {
    const jid = msg.key.remoteJid;
    if (!jid.endsWith('@g.us')) {
      await sock.sendMessage(jid, { text: '❌ This command only works in groups.' }, { quoted: msg });
      return;
    }
    const ctx = msg.message?.extendedTextMessage?.contextInfo;
    const mentions = ctx?.mentionedJid;
    let target = null;
    if (mentions?.length) target = mentions[0];
    else if (args.length > 0) {
      const num = args[0].replace(/[^0-9]/g, '');
      if (num.length > 8) target = num + '@s.whatsapp.net';
    }
    if (!target) {
      await sock.sendMessage(jid, { text: '⚠️ Mention or reply to the member you want to promote.\nExample: .promote @user' }, { quoted: msg });
      return;
    }
    try {
      await sock.groupParticipantsUpdate(jid, [target], 'promote');
      await sock.sendMessage(jid, { text: `✅ Promoted to admin! 🧛`, mentions: [target] }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(jid, { text: '❌ Failed to promote. Make sure I am admin.' }, { quoted: msg });
    }
  }
};
