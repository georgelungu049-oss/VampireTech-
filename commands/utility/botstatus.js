export default {
    name: 'botstatus',
    alias: ['bs', 'fullstatus', 'diagnostic'],
    description: 'Full bot diagnostic status',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const uptime = process.uptime();
        const h = Math.floor(uptime / 3600);
        const m = Math.floor((uptime % 3600) / 60);
        const s = Math.floor(uptime % 60);
        const ram = process.memoryUsage();
        const nodeVer = process.version;
        const platform = process.platform;
        
        await sock.sendMessage(chatId, { 
            text: `📊 *VAMPIRE MD DIAGNOSTIC*\n\n` +
                  `🧛 *Bot:* Vampire MD v1.0.0\n` +
                  `👑 *Owner:* Paxton\n` +
                  `📞 *SA:* +27687813781\n` +
                  `📞 *ZW:* +263776699348\n\n` +
                  `⏰ *Uptime:* ${h}h ${m}m ${s}s\n` +
                  `💾 *RAM Used:* ${(ram.heapUsed / 1024 / 1024).toFixed(2)} MB\n` +
                  `💾 *RAM Total:* ${(ram.heapTotal / 1024 / 1024).toFixed(2)} MB\n` +
                  `⚙️ *Node.js:* ${nodeVer}\n` +
                  `💻 *Platform:* ${platform}\n` +
                  `📡 *Status:* ✅ ONLINE\n\n` +
                  `🔗 *Channel:* https://whatsapp.com/channel/0029Vb7Smxe89inp918Glr1O\n` +
                  `👥 *Group:* https://chat.whatsapp.com/FjVOr9Ajf924tidBtB5Pgk\n\n` +
                  `> *Powered by Vampire Tech*`
        }, { quoted: msg });
    }
};
