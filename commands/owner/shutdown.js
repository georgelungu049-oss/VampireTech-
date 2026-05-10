export default {
    name: 'shutdown',
    alias: ['stop', 'off'],
    description: 'Shutdown the bot',
    category: 'owner',
    ownerOnly: true,
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        await sock.sendMessage(chatId, { text: '🛑 *Shutting down Vampire MD...*\n\n⚡ *Powered by Vampire Tech* 🧛' }, { quoted: msg });
        process.exit(0);
    }
};
