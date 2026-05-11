export default {
    name: 'kiss',
    alias: ['smooch', 'xoxo'],
    description: 'Kiss someone',
    category: 'fun',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        const target = mentioned || args[0];
        const name = target ? `@${target.split('@')[0]}` : 'everyone';
        
        const kisses = ['😘', '💋', '😚', '😙', '🥰', '😻', '💏'];
        const kiss = kisses[Math.floor(Math.random() * kisses.length)];
        
        await sock.sendMessage(chatId, { 
            text: `${kiss} *Smooch!* You kissed ${name}! 💕\n\n> *Powered by Vampire Tech*`,
            mentions: target ? [target] : []
        }, { quoted: msg });
    }
};
