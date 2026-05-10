export default {
    name: 'marry',
    alias: ['propose', 'wedding'],
    description: 'Propose to someone',
    category: 'fun',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        const target = mentioned || args[0] || msg.key.participant;
        const name = target ? `@${target.split('@')[0]}` : 'someone';
        
        const love = Math.floor(Math.random() * 100) + 1;
        let result;
        if (love > 80) result = `💍 *${name}* accepted! You are now married! 💒`;
        else if (love > 50) result = `💕 *${name}* is thinking about it... (${love}% love)`;
        else result = `💔 *${name}* rejected! Only ${love}% love 😢`;
        
        await sock.sendMessage(chatId, { 
            text: `${result}\n\n⚡ *Powered by Vampire Tech* 🧛`,
            mentions: target ? [target] : []
        }, { quoted: msg });
    }
};
