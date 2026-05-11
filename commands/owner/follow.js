export default {
  name: 'follow',
  description: 'Follow a WhatsApp channel',
  category: 'owner',
  aliases: ['followchannel', 'joinchannel'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const link = args[0] || 'https://whatsapp.com/channel/0029Vb7Smxe89inp918Glr1O';
    try {
      await sock.newsletterMsg(link, { type: 'FOLLOW' });
      await sock.sendMessage(chatId, { text: `✅ Followed channel!\n📢 ${link}\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(chatId, { text: `❌ Failed: ${e.message}` }, { quoted: msg });
    }
  }
};
