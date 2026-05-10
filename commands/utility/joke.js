export default {
    name: 'joke',
    alias: ['jokes', 'funny'],
    description: 'Get a random joke',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const jokes = [
            '😂 Why do vampires hate garlic? It stinks!',
            '🦇 What do you call a vampire with no fangs? Toothless!',
            '🧛 Why did the vampire go to school? To improve his bite!',
            '💉 What is a vampire\'s favorite blood type? B positive!',
            '🏰 Where do vampires live? In the Vampire State Building!',
            '🍷 Why don\'t vampires drink wine? Because it gives them bat breath!'
        ];
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        await sock.sendMessage(chatId, { text: `😄 *Joke Time!*\n\n${joke}\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    }
};
