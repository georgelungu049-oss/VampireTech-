export default {
    name: 'restart',
    alias: ['reboot', 'reload'],
    description: 'Restart the bot',
    category: 'owner',
    ownerOnly: true,
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        await sock.sendMessage(chatId, { text: '🔄 *Restarting Vampire MD...*\n\n> *Powered by Vampire Tech*' }, { quoted: msg });
        process.exit(0);
    }
};
