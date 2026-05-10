export default {
    name: 'status',
    alias: ['stats', 'botstatus'],
    description: 'Show bot status and uptime',
    category: 'owner',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const uptime = process.uptime();
        const h = Math.floor(uptime / 3600);
        const m = Math.floor((uptime % 3600) / 60);
        const s = Math.floor(uptime % 60);
        const mem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        
        await sock.sendMessage(chatId, { 
            text: `📊 *Vampire MD Status*\n\n⏰ *Uptime:* ${h}h ${m}m ${s}s\n💾 *Memory:* ${mem} MB\n📡 *Status:* Online\n🧛 *Bot:* Vampire MD\n👑 *Owner:* Paxton\n\n⚡ *Powered by Vampire Tech* 🧛`
        }, { quoted: msg });
    }
};
