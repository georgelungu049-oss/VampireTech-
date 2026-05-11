export default {
    name: 'wiki',
    alias: ['wikipedia', 'search'],
    description: 'Search Wikipedia',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const query = args.join(' ');
        if (!query) {
            return sock.sendMessage(chatId, { text: '❌ Provide a search term!' }, { quoted: msg });
        }
        await sock.sendMessage(chatId, { 
            text: `📚 *Wikipedia: ${query}*\n\n🔗 https://en.wikipedia.org/wiki/${encodeURIComponent(query.replace(/ /g, '_'))}\n\n> *Powered by Vampire Tech*` 
        }, { quoted: msg });
    }
};
