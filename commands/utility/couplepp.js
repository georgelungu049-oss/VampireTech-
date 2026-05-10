export default {
    name: 'couplepp',
    alias: ['cpp', 'couple', 'dp'],
    description: 'Get couple profile pictures',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        await sock.sendMessage(chatId, { 
            text: `💑 *Couple Profile Pictures*\n\n🔗 https://www.pinterest.com/search/pins/?q=couple+profile+pictures\n\n⚡ *Powered by Vampire Tech* 🧛` 
        }, { quoted: msg });
    }
};
