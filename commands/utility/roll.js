export default {
    name: 'roll',
    alias: ['dice', 'rolldice'],
    description: 'Roll a dice',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const result = Math.floor(Math.random() * 6) + 1;
        const diceEmojis = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        await sock.sendMessage(chatId, { text: `🎲 *Dice Roll:*\n\n${diceEmojis[result]} You rolled a *${result}*!\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    }
};
