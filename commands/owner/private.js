export default {
  name: 'private',
  description: 'Toggle private mode',
  category: 'owner',
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const action = args[0]?.toLowerCase() || 'on';
    if (action === 'on') return sock.sendMessage(chatId, { text: `🔒 *PRIVATE MODE ON!*\nOnly owner can use commands.\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    if (action === 'off') return sock.sendMessage(chatId, { text: `🔓 *PRIVATE MODE OFF!*\nEveryone can use bot.\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    return sock.sendMessage(chatId, { text: `.private on/off\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
