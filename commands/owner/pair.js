import fs from 'fs';

export default {
    name: 'pair',
    description: 'Send pairing code to someone',
    category: 'owner',
    aliases: ['pairing', 'getcode', 'sendcode'],
    ownerOnly: true,

    async execute(sock, msg, args, prefix) {
        const chatId = msg.key.remoteJid;
        const number = args[0]?.replace(/[^0-9]/g, '');
        
        if (!number || number.length < 10) {
            return sock.sendMessage(chatId, { 
                text: `❌ Use: ${prefix}pair 263776699348` 
            }, { quoted: msg });
        }

        const targetJid = number + '@s.whatsapp.net';

        try {
            const code = await sock.requestPairingCode(number);
            const cleanCode = code.replace(/\s/g, '');
            const formattedCode = cleanCode.length === 8 ? cleanCode.match(/.{1,4}/g).join('-') : cleanCode;

            // Send to target
            await sock.sendMessage(targetJid, { 
                text: `🔐 *PAIRING CODE*\n\n📞 +${number}\n🔑 ${formattedCode}\n\n📱 WhatsApp > Linked Devices > Enter code\n\n🧛 Vampire MD` 
            });

            // Confirm to owner
            await sock.sendMessage(chatId, { 
                text: `✅ Code sent to +${number}!\n🔑 ${formattedCode}\n\n⚡ Vampire Tech 🧛` 
            }, { quoted: msg });

        } catch (e) {
            await sock.sendMessage(chatId, { 
                text: `❌ Failed: ${e.message}` 
            }, { quoted: msg });
        }
    }
};
