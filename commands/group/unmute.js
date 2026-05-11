export default {
  name: 'unmute',
  description: 'Unmute the group',
  category: 'group',
  alias: ['unlock', 'open'],
  async execute(sock, msg, args) {
    const sender = msg.key.remoteJid;
    if (!sender.endsWith('@g.us')) {
      return sock.sendMessage(sender, { text: '❌ Group only!' }, { quoted: msg });
    }
    try {
      await sock.groupSettingUpdate(sender, 'not_announcement');
      await sock.sendMessage(sender, { text: '🔊 *Group unmuted!* Everyone can send messages.\n\n> *Powered by Vampire Tech*' }, { quoted: msg });
    } catch (error) {
      await sock.sendMessage(sender, { text: '❌ Failed to unmute!' }, { quoted: msg });
    }
  }
};
