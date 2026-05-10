export default {
    name: 'ping3',
    alias: ['p3', 'speed3'],
    description: 'Network speed test',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const start = Date.now();
        
        let downloadSpeed = 0;
        try {
            const res = await fetch('https://speed.cloudflare.com/__down?bytes=10000');
            const data = await res.arrayBuffer();
            const end = Date.now();
            const duration = (end - start) / 1000;
            downloadSpeed = (data.byteLength * 8 / 1000000 / duration).toFixed(2);
        } catch (e) {
            downloadSpeed = 'N/A';
        }
        
        await sock.sendMessage(chatId, { 
            text: `🌐 *Network Test*\n\n` +
                  `📥 *Download:* ${downloadSpeed} Mbps\n` +
                  `📡 *Latency:* ${Date.now() - start}ms\n` +
                  `🔗 *Server:* Cloudflare\n` +
                  `\n⚡ *Powered by Vampire Tech* 🧛`
        }, { quoted: msg });
    }
};
