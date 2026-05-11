export default {
    name: 'speedtest',
    alias: ['speed', 'net', 'internet'],
    description: 'Test internet speed',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const sent = await sock.sendMessage(chatId, { text: '🚀 *Running speed test...*\n⏳ Please wait...' });
        
        const start = Date.now();
        let speed1 = 0, speed2 = 0;
        
        try {
            const res1 = await fetch('https://speed.cloudflare.com/__down?bytes=50000');
            const mid = Date.now() - start;
            speed1 = (50000 * 8 / 1000000 / (mid / 1000)).toFixed(2);
        } catch (e) { speed1 = 'Error'; }
        
        try {
            const res2 = await fetch('https://speed.cloudflare.com/__down?bytes=100000');
            const mid2 = Date.now() - start;
            speed2 = (100000 * 8 / 1000000 / (mid2 / 1000)).toFixed(2);
        } catch (e) { speed2 = 'Error'; }
        
        const end = Date.now();
        
        await sock.sendMessage(chatId, { 
            text: `📶 *SPEED TEST RESULTS*\n\n` +
                  `📥 *Speed (50KB):* ${speed1} Mbps\n` +
                  `📥 *Speed (100KB):* ${speed2} Mbps\n` +
                  `📡 *Latency:* ${end - start}ms\n` +
                  `⏱️ *Total Time:* ${((end - start) / 1000).toFixed(2)}s\n\n` +
                  `> *Powered by Vampire Tech*`,
            edit: sent.key 
        });
    }
};
