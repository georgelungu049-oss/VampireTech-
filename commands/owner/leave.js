export default {
    name: 'leave',
    alias: ['exit', 'left'],
    description: 'Leave current group',
    category: 'owner',
    ownerOnly: true,
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        if (!chatId.endsWith('@g.us')) {
            return sock.sendMessage(chatId, { text: '❌ This command only works in groups!' }, { quoted: msg });
        }
        try {
            await sock.sendMessage(chatId, { text: '👋 Leaving group...\n\n> *Powered by Vampire Tech*' }, { quoted: msg });
            await sock.groupLeave(chatId);
        } catch (e) {
            await sock.sendMessage(chatId, { text: '❌ Failed to leave group!' }, { quoted: msg });
        }
    }
};
