export default {
  name: 'autoreact',
  alias: ['sr', 'statusreact', 'reacts'],
  description: 'Auto react to statuses',
  category: 'Status',

  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const action = args[0]?.toLowerCase();

    if (!action) {
      return sock.sendMessage(chatId, { 
        text: `🧛 *AutoReact Status*\n\n${prefix}autoreact on - Enable\n${prefix}autoreact off - Disable\n${prefix}autoreact emoji <emoji> - Set emoji\n\n⚡ *Powered by Vampire Tech*` 
      }, { quoted: msg });
    }

    if (action === 'on') {
      return sock.sendMessage(chatId, { text: '✅ AutoReact enabled! 🧛' }, { quoted: msg });
    }
    if (action === 'off') {
      return sock.sendMessage(chatId, { text: '❌ AutoReact disabled!' }, { quoted: msg });
    }
    if (action === 'emoji' && args[1]) {
      return sock.sendMessage(chatId, { text: `✅ Emoji set to: ${args[1]}` }, { quoted: msg });
    }
  }
};
