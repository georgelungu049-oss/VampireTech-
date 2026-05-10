export default {
    name: 'truthordare',
    alias: ['tod', 'truth', 'dare'],
    description: 'Play truth or dare',
    category: 'fun',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        
        const truths = [
            'What is your biggest fear? 😨',
            'Have you ever lied to your best friend? 🤥',
            'What is your most embarrassing moment? 😳',
            'Who was your first crush? 💕',
            'What is the last lie you told? 🤫',
            'Have you ever cheated on a test? 📝'
        ];
        
        const dares = [
            'Send a voice note singing! 🎤',
            'Change your profile picture to a funny face for 1 hour! 📸',
            'Send "I love you" to the 5th person in your chat list! 💌',
            'Do 10 pushups and send proof! 💪',
            'Speak in rhymes for the next 10 minutes! 🎭',
            'Post "I am a vampire" as your status! 🧛'
        ];
        
        const isTruth = Math.random() < 0.5;
        const result = isTruth ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
        
        await sock.sendMessage(chatId, { 
            text: `🎮 *${isTruth ? 'TRUTH' : 'DARE'}*\n\n${result}\n\n⚡ *Powered by Vampire Tech* 🧛`
        }, { quoted: msg });
    }
};
