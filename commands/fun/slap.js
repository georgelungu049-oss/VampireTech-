export default {
    name: 'slap',
    alias: ['hit', 'smack'],
    description: 'Slap someone',
    category: 'fun',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        const target = mentioned || args[0];
        const name = target ? `@${target.split('@')[0]}` : 'themself';
        
        await sock.sendMessage(chatId, { 
            text: `👋 *SLAP!* ${name} got slapped hard! 😱💥\n\n⚡ *Powered by Vampire Tech* 🧛`,
            mentions: target ? [target] : []
        }, { quoted: msg });
    }
};
