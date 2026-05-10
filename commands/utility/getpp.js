export default {
  name: 'getpp',
  description: 'Get full-size profile picture',
  category: 'utility',
  aliases: ['getprofile', 'fullpp', 'pp'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
    const target = mentioned || (args[0] ? args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net' : msg.key.participant || chatId);
    try {
      const pp = await sock.profilePictureUrl(target, 'image');
      await sock.sendMessage(chatId, { image: { url: pp }, caption: `🖼️ *Profile Pic*\n👤 @${target.split('@')[0]}\n\n⚡ *Vampire Tech* 🧛`, mentions: [target] }, { quoted: msg });
    } catch (e) { await sock.sendMessage(chatId, { text: '❌ No profile picture!' }, { quoted: msg }); }
  }
};
