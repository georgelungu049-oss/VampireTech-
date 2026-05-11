export default {
  name: 'mute',
  description: 'Mute the group (admin only messages)',
  category: 'group',
  alias: ['lock', 'silence', 'close'],
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    if (!sender.endsWith('@g.us')) {
      return sock.sendMessage(sender, { text: '❌ Group only!' }, { quoted: msg });
    }
    try {
      await sock.groupSettingUpdate(sender, 'announcement');
      await sock.sendMessage(sender, { text: '🔇 *Group muted!* Only admins can send messages.\n\n> *Powered by Vampire Tech*' }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(sender, { text: '❌ Failed to mute! I need admin permissions.' }, { quoted: msg });
    }
  }
};
