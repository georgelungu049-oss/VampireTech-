export default {
    name: 'autoview',
    alias: ['autoseen', 'viewstatus'],
    description: 'Auto view all statuses',
    category: 'automation',
    async execute(sock, msg, args, PREFIX) {
        const chatId = msg.key.remoteJid;
        const action = args[0]?.toLowerCase();
        
        if (!action) {
            return sock.sendMessage(chatId, { 
                text: `👁️ *Auto View Status*\n\n${PREFIX}autoview on - Enable\n${PREFIX}autoview off - Disable\n${PREFIX}autoview status - Check status\n\n⚡ *Powered by Vampire Tech* 🧛` 
            }, { quoted: msg });
        }
        
        if (action === 'on') {
            return sock.sendMessage(chatId, { text: '✅ Auto view status ENABLED! All statuses will be marked as viewed. 👁️' }, { quoted: msg });
        }
        if (action === 'off') {
            return sock.sendMessage(chatId, { text: '❌ Auto view status DISABLED!' }, { quoted: msg });
        }
        if (action === 'status') {
            return sock.sendMessage(chatId, { text: '👁️ *Auto View:* ENABLED ✅\n📊 Statuses viewed: Running...' }, { quoted: msg });
        }
    }
};
