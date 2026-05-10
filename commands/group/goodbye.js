export default {
    name: 'goodbye',
    alias: ['goodbyemsg', 'setgoodbye', 'bye'],
    category: 'group',
    description: 'Send goodbye messages',
    async execute(sock, msg, args, PREFIX) {
        const chatId = msg.key.remoteJid;
        if (!chatId.endsWith('@g.us')) {
            return sock.sendMessage(chatId, { text: '❌ Group only!' }, { quoted: msg });
        }
        const action = args[0]?.toLowerCase();
        if (!action) {
            return sock.sendMessage(chatId, { 
                text: `👋 *Goodbye System*\n\n${PREFIX}goodbye on - Enable\n${PREFIX}goodbye off - Disable\n${PREFIX}goodbye set <msg> - Custom message\n\n⚡ *Powered by Vampire Tech* 🧛`
            }, { quoted: msg });
        }
        if (action === 'on') return sock.sendMessage(chatId, { text: '✅ Goodbye messages ENABLED!' }, { quoted: msg });
        if (action === 'off') return sock.sendMessage(chatId, { text: '❌ Goodbye messages DISABLED!' }, { quoted: msg });
    }
};
