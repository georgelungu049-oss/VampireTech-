export default {
    name: 'unban',
    description: 'Unban a user from the group ban list',
    category: 'group',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        if (!chatId.endsWith('@g.us')) {
            return sock.sendMessage(chatId, { text: '❌ Group only!' }, { quoted: msg });
        }
        let target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        if (!target && args[0]) {
            let num = args[0].replace(/[^0-9]/g, '');
            if (num.length >= 8) target = num + '@s.whatsapp.net';
        }
        if (!target) {
            return sock.sendMessage(chatId, { text: '⚠️ Mention someone to unban!' }, { quoted: msg });
        }
        await sock.sendMessage(chatId, { text: `✅ @${target.split('@')[0]} has been unbanned!`, mentions: [target] }, { quoted: msg });
    }
};
