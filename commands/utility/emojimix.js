export default {
    name: 'emojimix',
    alias: ['emix', 'mixemoji'],
    description: 'Mix two emojis',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const emoji1 = args[0] || '🧛';
        const emoji2 = args[1] || '❤️';
        await sock.sendMessage(chatId, { 
            text: `🎨 *Emoji Mix:* ${emoji1} + ${emoji2} = 🧛❤️\n\n> *Powered by Vampire Tech*` 
        }, { quoted: msg });
    }
};
