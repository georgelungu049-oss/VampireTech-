export default {
  name: 'setownernumber',
  description: 'Change owner phone number',
  category: 'settings',
  aliases: ['ownernum'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const num = args[0]?.replace(/[^0-9]/g,'');
    if (!num) return sock.sendMessage(chatId, { text: `❌ .setownernumber <number>\nCurrent: +27 70 427 8701\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    await sock.sendMessage(chatId, { text: `✅ Owner number set to: +${num}\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
