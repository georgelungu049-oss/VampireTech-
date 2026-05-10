export default {
    name: 'join',
    alias: ['joingroup', 'enter'],
    description: 'Join a group via invite link',
    category: 'owner',
    ownerOnly: true,
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const link = args[0];
        if (!link) {
            return sock.sendMessage(chatId, { text: '❌ Provide a group invite link!' }, { quoted: msg });
        }
        try {
            const code = link.split('/').pop();
            await sock.groupAcceptInvite(code);
            await sock.sendMessage(chatId, { text: '✅ Joined group successfully! 🧛' }, { quoted: msg });
        } catch (e) {
            await sock.sendMessage(chatId, { text: '❌ Failed to join group. Check the link!' }, { quoted: msg });
        }
    }
};
