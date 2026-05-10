export default {
    name: 'divorce',
    alias: ['breakup', 'split'],
    description: 'Divorce your partner',
    category: 'fun',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        const target = mentioned || args[0];
        const name = target ? `@${target.split('@')[0]}` : 'your partner';
        
        await sock.sendMessage(chatId, { 
            text: `💔 *Divorce finalized!*\nYou are now separated from ${name} 📝\n\n⚡ *Powered by Vampire Tech* 🧛`,
            mentions: target ? [target] : []
        }, { quoted: msg });
    }
};
