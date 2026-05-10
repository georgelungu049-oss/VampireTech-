export default {
    name: 'alive',
    alias: ['online', 'up', 'active'],
    description: 'Check if bot is alive',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        await sock.sendMessage(chatId, { 
            text: `🧛 *Vampire MD is Alive!*\n\n` +
                  `✅ *Status:* ONLINE\n` +
                  `⚡ *Response:* Instant\n` +
                  `👑 *Owner:* Paxton\n` +
                  `📞 *Contact:* +27687813781\n\n` +
                  `⚡ *Powered by Vampire Tech* 🧛`
        }, { quoted: msg });
    }
};
