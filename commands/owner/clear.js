export default {
    name: 'clear',
    alias: ['cls', 'clean'],
    description: 'Clear all messages in chat',
    category: 'owner',
    ownerOnly: true,
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        await sock.sendMessage(chatId, { text: '🧹 *Chat cleared!*\n\n⚡ *Powered by Vampire Tech* 🧛' }, { quoted: msg });
    }
};
