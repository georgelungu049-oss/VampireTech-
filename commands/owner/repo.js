export default {
    name: 'repo',
    description: 'Get bot repository link',
    category: 'owner',
    aliases: ['repository', 'github', 'source', 'sc'],
    
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        
        await sock.sendMessage(chatId, { 
            text: `📂 *Vampire MD Repository*\n\n🔗 https://github.com/georgelungu049-oss/VampireTech-\n\n👑 *Owner:* Paxton\n📞 wa.me/27687813781\n\n> *Powered by Vampire Tech*` 
        }, { quoted: msg });
    }
};
