export default {
  name: 'addchannel',
  description: 'Add channel to auto-follow list',
  category: 'owner',
  aliases: ['savechannel', 'setchannel'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const link = args[0];
    if (!link) return sock.sendMessage(chatId, { text: '❌ Provide channel link!', mentions: [] }, { quoted: msg });
    await sock.sendMessage(chatId, { text: `✅ Channel added to auto-follow!\n📢 ${link}\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
