import fs from 'fs';

const pairingRequests = new Map();

export default {
    name: 'pair',
    description: 'Generate pairing code for a number',
    category: 'owner',
    aliases: ['pairing', 'generatepair'],
    ownerOnly: true,

    async execute(sock, msg, args, prefix) {
        const chatId = msg.key.remoteJid;
        const number = args[0]?.replace(/[^0-9]/g, '');
        
        if (!number || number.length < 10) {
            return sock.sendMessage(chatId, { 
                text: `❌ Usage: ${prefix}pair 27687813781` 
            }, { quoted: msg });
        }

        try {
            // Generate pairing code from the connected bot
            const code = await sock.requestPairingCode(number);
            const formattedCode = code.match(/.{1,4}/g)?.join('-') || code;
            
            pairingRequests.set(number, {
                code,
                chatId,
                timestamp: Date.now()
            });

            await sock.sendMessage(chatId, { 
                text: `🔐 *PAIRING CODE*\n\n📞 *Number:* +${number}\n🔑 *Code:* ${formattedCode}\n\n📱 *Steps:*\n1. Open WhatsApp\n2. Settings → Linked Devices\n3. Link a Device\n4. Enter the code\n\n⏳ Code expires in 10 minutes\n\n⚡ *Powered by Vampire Tech* 🧛` 
            }, { quoted: msg });

            // Listen for connection
            const checkConnection = setInterval(async () => {
                try {
                    if (sock.authState?.creds?.registered) {
                        const creds = JSON.parse(fs.readFileSync('./session/creds.json', 'utf8'));
                        const sessionID = 'VAMPIRE-MD:' + Buffer.from(JSON.stringify(creds)).toString('base64');
                        
                        await sock.sendMessage(chatId, { 
                            text: `✅ *PAIRED SUCCESSFULLY!*\n\n📋 *SESSION ID:*\n\`\`\`${sessionID.substring(0, 200)}...\`\`\`\n\n📁 Full session file sent below.\n\n🚀 Use this to deploy on Katabump/Panel!\n\n⚡ *Powered by Vampire Tech* 🧛` 
                        });
                        
                        // Send session file
                        await sock.sendMessage(chatId, {
                            document: Buffer.from(JSON.stringify(creds, null, 2)),
                            fileName: `session-${number}.json`,
                            mimetype: 'application/json',
                            caption: '📁 Vampire MD Session File'
                        });

                        clearInterval(checkConnection);
                    }
                } catch (e) {}
            }, 3000);

            // Stop checking after 2 minutes
            setTimeout(() => clearInterval(checkConnection), 120000);

        } catch (e) {
            await sock.sendMessage(chatId, { 
                text: `❌ Error: ${e.message}` 
            }, { quoted: msg });
        }
    }
};
