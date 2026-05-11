export default {
  name: 'botmode',
  description: 'Change bot mode (public/private)',
  category: 'owner',
  aliases: ['mode', 'setmode'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase() || 'public';
    const modes = ['public', 'private', 'silent', 'group-only', 'maintenance'];
    if (!modes.includes(mode)) return sock.sendMessage(chatId, { text: `❌ Invalid mode!\nModes: ${modes.join(', ')}\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    await sock.sendMessage(chatId, { text: `✅ Bot mode set to: *${mode.toUpperCase()}*\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
