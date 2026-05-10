export default {
    name: 'broadcast',
    alias: ['bc', 'announce'],
    description: 'Send broadcast message to all chats',
    category: 'owner',
    ownerOnly: true,
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const message = args.join(' ');
        if (!message) {
            return sock.sendMessage(chatId, { text: '❌ Provide a message to broadcast!' }, { quoted: msg });
        }
        await sock.sendMessage(chatId, { text: `📢 *Broadcast sent!*\n\n${message}\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    }
};
