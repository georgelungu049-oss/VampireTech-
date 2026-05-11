export default {
    name: 'pick',
    alias: ['choose', 'random'],
    description: 'Pick random from options',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const options = args.join(' ').split(',').map(o => o.trim()).filter(o => o);
        if (options.length < 2) {
            return sock.sendMessage(chatId, { text: '❌ Provide options separated by commas!\nExample: .pick option1, option2, option3' }, { quoted: msg });
        }
        const chosen = options[Math.floor(Math.random() * options.length)];
        await sock.sendMessage(chatId, { text: `🎯 *I Pick:*\n\n*${chosen}*\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    }
};
