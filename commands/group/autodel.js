export default {
  name: 'autodel',
  description: 'Auto delete messages after time',
  category: 'group',
  aliases: ['autodelete', 'delmsg', 'selfdestruct'],
  
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const seconds = parseInt(args[0]) || 10;
    
    if (!args[1]) {
      return sock.sendMessage(chatId, { text: `⏳ ${prefix}autodel <seconds> <message>\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    }
    
    const message = args.slice(1).join(' ');
    const sent = await sock.sendMessage(chatId, { text: `💣 *SELF DESTRUCT in ${seconds}s*\n\n${message}\n\n⚡ *Powered by Vampire Tech* 🧛` });
    
    setTimeout(async () => {
      try {
        await sock.sendMessage(chatId, { delete: sent.key });
      } catch (e) {}
    }, seconds * 1000);
  }
};
