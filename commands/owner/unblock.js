export default {
    name: 'unblock',
    description: 'Unblock a user',
    category: 'owner',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        let target = null;
        if (args[0]) {
            const num = args[0].replace(/[^0-9]/g, '');
            if (num.length >= 7) target = num + '@s.whatsapp.net';
        }
        if (!target) {
            target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        }
        if (!target) {
            return sock.sendMessage(chatId, { text: '⚠️ Provide a number or mention someone to unblock!' }, { quoted: msg });
        }
        try {
            await sock.updateBlockStatus(target, 'unblock');
            await sock.sendMessage(chatId, { text: `✅ Unblocked!`, mentions: [target] }, { quoted: msg });
        } catch (e) {
            await sock.sendMessage(chatId, { text: '❌ Failed to unblock!' }, { quoted: msg });
        }
    }
};
