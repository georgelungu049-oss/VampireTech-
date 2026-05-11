export default {
    name: 'weather',
    alias: ['temp', 'climate'],
    description: 'Check weather (placeholder)',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const city = args.join(' ') || 'Nairobi';
        await sock.sendMessage(chatId, { 
            text: `🌤️ *Weather for ${city}*\n\n🌡️ Temperature: 25°C\n💧 Humidity: 65%\n🌬️ Wind: 12 km/h\n\n> *Powered by Vampire Tech*` 
        }, { quoted: msg });
    }
};
