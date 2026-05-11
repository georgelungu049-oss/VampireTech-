export default {
    name: 'autobio',
    alias: ['setbio', 'bio'],
    description: 'Auto update bot bio/status',
    category: 'automation',
    async execute(sock, msg, args, PREFIX) {
        const chatId = msg.key.remoteJid;
        const bio = args.join(' ') || '🧛 Vampire MD | Powered by Vampire Tech';
        
        try {
            await sock.updateProfileStatus(bio);
            await sock.sendMessage(chatId, { text: `✅ *Bio Updated!*\n\n📝 "${bio}"\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
        } catch (e) {
            await sock.sendMessage(chatId, { text: '❌ Failed to update bio!' }, { quoted: msg });
        }
    }
};
