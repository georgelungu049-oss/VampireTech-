export default {
    name: 'quote',
    alias: ['quotes', 'wisdom'],
    description: 'Get random quote',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const quotes = [
            '"The only way to do great work is to love what you do." - Steve Jobs',
            '"Life is what happens when you\'re busy making other plans." - John Lennon',
            '"The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt',
            '"Success is not final, failure is not fatal." - Winston Churchill',
            '"Be yourself; everyone else is already taken." - Oscar Wilde',
            '"Two things are infinite: the universe and human stupidity." - Albert Einstein'
        ];
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        await sock.sendMessage(chatId, { text: `💭 *Quote:*\n\n${quote}\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    }
};
