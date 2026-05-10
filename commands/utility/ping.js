export default {
    name: 'ping',
    alias: ['p', 'speed'],
    description: 'Check bot response speed',
    category: 'utility',
    async execute(sock, msg, args) {
        const start = Date.now();
        const sent = await sock.sendMessage(msg.key.remoteJid, { text: '🧛 *Vampire MD*\n⏳ Testing speed...' });
        const end = Date.now();
        const latency = end - start;
        let emoji, status;
        if (latency < 100) { emoji = '🟢'; status = 'Excellent'; }
        else if (latency < 300) { emoji = '🟡'; status = 'Good'; }
        else { emoji = '🔴'; status = 'Slow'; }
        
        await sock.sendMessage(msg.key.remoteJid, { 
            text: `🏓 *Pong!*\n\n📡 *Latency:* ${latency}ms ${emoji}\n⚡ *Status:* ${status}\n🧛 *Bot:* Vampire MD\n\n⚡ *Powered by Vampire Tech*`,
            edit: sent.key 
        });
    }
};
