import fs from 'fs';

export default {
    name: 'sessionid',
    description: 'Get your current session ID',
    category: 'owner',
    aliases: ['getsession', 'mysession'],
    ownerOnly: true,

    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        
        try {
            const credsPath = './session/creds.json';
            
            if (!fs.existsSync(credsPath)) {
                return sock.sendMessage(chatId, { 
                    text: '❌ No session found! Pair the bot first.' 
                }, { quoted: msg });
            }

            const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
            const sessionID = 'VAMPIRE-MD:' + Buffer.from(JSON.stringify(creds)).toString('base64');

            await sock.sendMessage(chatId, { 
                text: `📋 *YOUR SESSION ID*\n\n\`\`\`VAMPIRE-MD:${sessionID.substring(50, 150)}...\`\`\`\n\n📁 Full session file sent below\n\n🚀 Deploy on Katabump/Panel!\n\n⚡ *Powered by Vampire Tech* 🧛` 
            });

            // Send as file
            await sock.sendMessage(chatId, {
                document: Buffer.from(JSON.stringify(creds, null, 2)),
                fileName: 'vampire-md-session.json',
                mimetype: 'application/json',
                caption: '📁 Vampire MD Session - Use to deploy!'
            });

        } catch (e) {
            await sock.sendMessage(chatId, { 
                text: `❌ Error: ${e.message}` 
            }, { quoted: msg });
        }
    }
};
