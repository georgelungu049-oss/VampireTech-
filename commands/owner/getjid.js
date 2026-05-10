export default {
    name: 'getjid',
    alias: ['jid', 'id'],
    description: 'Get user/group JID',
    category: 'owner',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const target = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0] || chatId;
        await sock.sendMessage(chatId, { text: `🆔 *JID Info*\n\n📱 *JID:* \`${target}\`\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    }
};
