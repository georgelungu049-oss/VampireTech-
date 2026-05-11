export default {
    name: 'flip',
    alias: ['coin', 'toss'],
    description: 'Flip a coin',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const result = Math.random() < 0.5 ? 'Heads 🪙' : 'Tails 🪙';
        await sock.sendMessage(chatId, { text: `🪙 *Coin Flip:*\n\n${result}\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    }
};
