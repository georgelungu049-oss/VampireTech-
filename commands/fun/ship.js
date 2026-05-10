export default {
    name: 'ship',
    alias: ['couple', 'pair'],
    description: 'Ship two people together',
    category: 'fun',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        const name1 = mentioned?.[0] ? `@${mentioned[0].split('@')[0]}` : (args[0] || 'You');
        const name2 = mentioned?.[1] ? `@${mentioned[1].split('@')[0]}` : (args[1] || 'Someone');
        const percent = Math.floor(Math.random() * 100) + 1;
        
        const shipName = name1.replace('@','').substring(0,3) + name2.replace('@','').substring(0,3);
        
        await sock.sendMessage(chatId, { 
            text: `🚢 *SHIP ALERT!*\n\n${name1} 💕 ${name2}\n\n💘 Ship Name: *${shipName}*\n💯 Compatibility: ${percent}%\n\n⚡ *Powered by Vampire Tech* 🧛`,
            mentions: mentioned || []
        }, { quoted: msg });
    }
};
