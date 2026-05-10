export default {
  name: 'groupinfo',
  description: 'Show detailed group information',
  category: 'group',
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    if (!sender.endsWith('@g.us')) {
      return sock.sendMessage(sender, { text: '❌ Group only!' }, { quoted: msg });
    }
    try {
      const meta = await sock.groupMetadata(sender);
      const text = `📊 *GROUP INFO*\n\n📛 *Name:* ${meta.subject}\n🆔 *ID:* ${sender}\n👥 *Members:* ${meta.participants.length}\n📅 *Created:* ${new Date(meta.creation * 1000).toLocaleDateString()}\n🔧 *Mode:* ${meta.restrict ? 'Restricted' : 'Open'}\n\n⚡ *Powered by Vampire Tech* 🧛`;
      await sock.sendMessage(sender, { text }, { quoted: msg });
    } catch (err) {
      await sock.sendMessage(sender, { text: '❌ Failed to get group info!' }, { quoted: msg });
    }
  }
};
