import { execSync } from 'child_process';

export default {
    name: 'update',
    description: 'Update bot from GitHub repo',
    category: 'owner',
    aliases: ['upgrade', 'gitpull'],
    ownerOnly: true,
    
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        
        await sock.sendMessage(chatId, { 
            text: '🔄 *Checking for updates...*\n\n📡 Fetching from VampireTech repo...' 
        }, { quoted: msg });
        
        try {
            const result = execSync('cd ~/vampire-md && git pull origin main 2>&1').toString();
            
            if (result.includes('Already up to date')) {
                await sock.sendMessage(chatId, { 
                    text: `✅ *Vampire MD is up to date!*\n\n📦 Version: 1.0.0\n🧛 No updates available.\n\n⚡ *Powered by Vampire Tech* 🧛` 
                }, { quoted: msg });
            } else {
                await sock.sendMessage(chatId, { 
                    text: `✅ *Update successful!*\n\n📥 Changes pulled:\n\`\`\`${result.substring(0, 300)}\`\`\`\n\n🔄 Restarting bot...\n\n⚡ *Powered by Vampire Tech* 🧛` 
                }, { quoted: msg });
                process.exit(0);
            }
        } catch (e) {
            await sock.sendMessage(chatId, { 
                text: `❌ *Update failed!*\n\n${e.message}\n\n⚡ *Powered by Vampire Tech* 🧛` 
            }, { quoted: msg });
        }
    }
};
