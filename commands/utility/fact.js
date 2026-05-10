export default {
    name: 'fact',
    alias: ['facts', 'didyouknow'],
    description: 'Get a random fact',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const facts = [
            '🧛 Vampires were originally depicted as bloated, dark creatures, not pale and elegant.',
            '💡 A day on Venus is longer than a year on Venus.',
            '🔍 The Eiffel Tower can be 15 cm taller during summer due to thermal expansion.',
            '🧠 Your brain uses 20% of your body\'s total oxygen and energy.',
            '🌍 Earth is the only planet not named after a god.',
            '🦋 Butterflies can taste with their feet.',
            '🎵 Listening to music while working can improve productivity.',
            '📱 The first mobile phone call was made in 1973.',
            '🏔️ Mount Everest grows about 4mm every year.',
            '🌧️ It can rain diamonds on Jupiter and Saturn!'
        ];
        const fact = facts[Math.floor(Math.random() * facts.length)];
        await sock.sendMessage(chatId, { text: `📚 *Random Fact:*\n\n${fact}\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    }
};
