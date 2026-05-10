export default {
    name: 'calc',
    alias: ['calculator', 'math'],
    description: 'Simple calculator',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const expr = args.join(' ');
        if (!expr) {
            return sock.sendMessage(chatId, { text: '❌ Provide a math expression!\nExample: .calc 2+2*3' }, { quoted: msg });
        }
        try {
            const result = eval(expr.replace(/[^0-9+\-*/().%\s]/g, ''));
            await sock.sendMessage(chatId, { text: `🧮 *Calculator*\n\n${expr} = *${result}*\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
        } catch (e) {
            await sock.sendMessage(chatId, { text: '❌ Invalid expression!' }, { quoted: msg });
        }
    }
};
