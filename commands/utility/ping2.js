export default {
    name: 'ping2',
    alias: ['p2', 'speed2'],
    description: 'Advanced ping with server info',
    category: 'utility',
    async execute(sock, msg, args) {
        const start = Date.now();
        const end = Date.now();
        const latency = end - start;
        const uptime = process.uptime();
        const h = Math.floor(uptime / 3600);
        const m = Math.floor((uptime % 3600) / 60);
        const s = Math.floor(uptime % 60);
        const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const cpu = (process.cpuUsage().user / 1000000).toFixed(2);
        
        await sock.sendMessage(msg.key.remoteJid, { 
            text: `🏓 *Pong 2!*\n\n` +
                  `📡 *Latency:* ${latency}ms\n` +
                  `⏰ *Uptime:* ${h}h ${m}m ${s}s\n` +
                  `💾 *RAM:* ${ram} MB\n` +
                  `⚙️ *CPU:* ${cpu}s\n` +
                  `📶 *Platform:* Termux/Android\n` +
                  `\n⚡ *Powered by Vampire Tech* 🧛`
        }, { quoted: msg });
    }
};
