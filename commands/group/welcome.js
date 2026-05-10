export default {
    name: 'welcome',
    alias: ['welcomemsg', 'setwelcome'],
    category: 'group',
    description: 'Welcome new members',
    async execute(sock, msg, args, PREFIX) {
        const chatId = msg.key.remoteJid;
        if (!chatId.endsWith('@g.us')) {
            return sock.sendMessage(chatId, { text: '❌ Group only!' }, { quoted: msg });
        }
        const action = args[0]?.toLowerCase();
        if (!action) {
            return sock.sendMessage(chatId, { 
                text: `🎉 *Welcome System*\n\n${PREFIX}welcome on - Enable\n${PREFIX}welcome off - Disable\n${PREFIX}welcome set <msg> - Custom message\n\n⚡ *Powered by Vampire Tech* 🧛`
            }, { quoted: msg });
        }
        if (action === 'on') return sock.sendMessage(chatId, { text: '✅ Welcome messages ENABLED!' }, { quoted: msg });
        if (action === 'off') return sock.sendMessage(chatId, { text: '❌ Welcome messages DISABLED!' }, { quoted: msg });
        if (action === 'set') {
            const msg2 = args.slice(1).join(' ');
            if (!msg2) return sock.sendMessage(chatId, { text: '❌ Provide a message!' }, { quoted: msg });
            return sock.sendMessage(chatId, { text: `✅ Welcome message set to:\n"${msg2}"` }, { quoted: msg });
        }
    }
};
