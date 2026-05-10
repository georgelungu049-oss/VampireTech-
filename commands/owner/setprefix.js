export default {
    name: 'setprefix',
    alias: ['prefix', 'changeprefix'],
    description: 'Change bot prefix',
    category: 'owner',
    ownerOnly: true,
    async execute(sock, msg, args, PREFIX) {
        const chatId = msg.key.remoteJid;
        const newPrefix = args[0];
        if (!newPrefix) {
            return sock.sendMessage(chatId, { text: `❌ Provide a new prefix!\nExample: .setprefix !\n\nCurrent prefix: ${PREFIX}` }, { quoted: msg });
        }
        if (newPrefix.length > 3) {
            return sock.sendMessage(chatId, { text: '❌ Prefix must be 1-3 characters!' }, { quoted: msg });
        }
        await sock.sendMessage(chatId, { text: `✅ Prefix changed to: *${newPrefix}*\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    }
};
