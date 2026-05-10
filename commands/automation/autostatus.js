export default {
  name: 'autostatus',
  description: 'Auto post WhatsApp statuses',
  category: 'automation',
  aliases: ['autostory', 'autopost'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const action = args[0]?.toLowerCase();
    
    if (action === 'on') {
      await sock.sendMessage(chatId, { text: '📢 Auto-status posting ENABLED!\n\n🧛 Vampire MD will post statuses automatically.\n\n⚡ *Powered by Vampire Tech* 🧛' }, { quoted: msg });
    } else if (action === 'off') {
      await sock.sendMessage(chatId, { text: '📢 Auto-status posting DISABLED!\n\n⚡ *Powered by Vampire Tech* 🧛' }, { quoted: msg });
    } else {
      await sock.sendMessage(chatId, { text: `📢 *Auto Status*\n\n.autostatus on - Enable\n.autostatus off - Disable\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    }
  }
};
