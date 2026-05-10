export default {
    name: 'autorecording',
    alias: ['recording', 'autorec'],
    description: 'Show recording indicator',
    category: 'automation',
    async execute(sock, msg, args, PREFIX) {
        const chatId = msg.key.remoteJid;
        const action = args[0]?.toLowerCase();
        
        if (!action) {
            return sock.sendMessage(chatId, { 
                text: `🎙️ *Auto Recording*\n\n${PREFIX}autorecording on - Show recording\n${PREFIX}autorecording off - Hide recording\n\n⚡ *Powered by Vampire Tech* 🧛` 
            }, { quoted: msg });
        }
        
        if (action === 'on') {
            await sock.sendPresenceUpdate('recording', chatId);
            return sock.sendMessage(chatId, { text: '🎙️ Recording indicator shown!' }, { quoted: msg });
        }
        if (action === 'off') {
            await sock.sendPresenceUpdate('paused', chatId);
            return sock.sendMessage(chatId, { text: '🎙️ Recording indicator stopped!' }, { quoted: msg });
        }
    }
};
