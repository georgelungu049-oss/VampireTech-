export default {
  name: 'prefixinfo',
  description: 'Show current prefix info',
  category: 'utility',
  aliases: ['myprefix', 'whatprefix'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, { text: `💬 *PREFIX INFO*\n\nCurrent Prefix: *${prefix}*\nExample: ${prefix}ping\n\nTo change: ${prefix}setprefix <new>\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
