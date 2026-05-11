export default {
  name: 'channels',
  description: 'Show configured channels',
  category: 'utility',
  aliases: ['mychannels', 'channellist'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, { text: `📢 *VAMPIRE MD CHANNELS*\n\n🔗 Vampire Updates:\nhttps://whatsapp.com/channel/0029Vb7Smxe89inp918Glr1O\n\n🔗 Vampire Tech:\nhttps://whatsapp.com/channel/0029Vb7Smxe89inp918Glr1O\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
