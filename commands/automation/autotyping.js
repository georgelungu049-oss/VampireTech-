export default {
    name: 'autotyping',
    alias: ['typing', 'autotype'],
    description: 'Toggle auto typing indicator',
    category: 'automation',
    async execute(sock, msg, args, PREFIX) {
        const chatId = msg.key.remoteJid;
        const action = args[0]?.toLowerCase();
        
        if (!action) {
            return sock.sendMessage(chatId, { 
                text: `⌨️ *Auto Typing*\n\n${PREFIX}autotyping on - Show typing\n${PREFIX}autotyping off - Hide typing\n${PREFIX}autotyping <chat> - Show in specific chat\n\n⚡ *Powered by Vampire Tech* 🧛` 
            }, { quoted: msg });
        }
        
        if (action === 'on') {
            await sock.sendPresenceUpdate('composing', chatId);
            return sock.sendMessage(chatId, { text: '⌨️ Typing indicator shown!' }, { quoted: msg });
        }
        if (action === 'off') {
            await sock.sendPresenceUpdate('paused', chatId);
            return sock.sendMessage(chatId, { text: '⌨️ Typing indicator stopped!' }, { quoted: msg });
        }
    }
};
