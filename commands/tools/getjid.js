export default {
  name: 'getjid',
  description: 'Get JID of chat/user/group',
  category: 'tools',
  aliases: ['jid', 'id'],
  async execute(sock, m, args) {
    const chatJid = m.key.remoteJid;
    const mentioned = m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    const resolvedJid = mentioned || chatJid;
    await sock.sendMessage(chatJid, { text: `🆔 *JID*\n\`${resolvedJid}\`\n\n> *Powered by Vampire Tech*` }, { quoted: m });
  }
};
