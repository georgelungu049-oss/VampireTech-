export default {
    name: 'hug',
    alias: ['cuddle', 'embrace'],
    description: 'Hug someone',
    category: 'fun',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        const target = mentioned || args[0];
        const name = target ? `@${target.split('@')[0]}` : 'everyone';
        
        await sock.sendMessage(chatId, { 
            text: `🤗 *Warm hug!* ${name} got a big hug! 🫂💕\n\n⚡ *Powered by Vampire Tech* 🧛`,
            mentions: target ? [target] : []
        }, { quoted: msg });
    }
};
