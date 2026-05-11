export default {
    name: 'setname',
    alias: ['botname', 'name'],
    description: 'Change bot display name',
    category: 'owner',
    ownerOnly: true,
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const newName = args.join(' ');
        if (!newName) {
            return sock.sendMessage(chatId, { text: '❌ Provide a new bot name!' }, { quoted: msg });
        }
        await sock.sendMessage(chatId, { text: `✅ Bot name changed to: *${newName}*\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    }
};
