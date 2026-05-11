export default {
  name: 'mode',
  description: 'Change bot mode (public/private/group)',
  category: 'owner',
  aliases: ['setmode', 'botmode'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const mode = args[0]?.toLowerCase();
    
    const modes = {
      'public': '✅ *PUBLIC MODE*\nEveryone can use the bot.',
      'private': '🔒 *PRIVATE MODE*\nOnly owner can use the bot.',
      'group': '👥 *GROUP ONLY MODE*\nBot only works in groups.',
      'silent': '🤫 *SILENT MODE*\nBot responds without notifications.'
    };
    
    if (!mode || !modes[mode]) {
      return sock.sendMessage(chatId, { 
        text: `⚙️ *BOT MODE*\n\n${prefix}mode public\n${prefix}mode private\n${prefix}mode group\n${prefix}mode silent\n\nCurrent: public\n\n> *Powered by Vampire Tech*` 
      }, { quoted: msg });
    }
    
    await sock.sendMessage(chatId, { 
      text: `${modes[mode]}\n\n> *Powered by Vampire Tech*` 
    }, { quoted: msg });
  }
};
