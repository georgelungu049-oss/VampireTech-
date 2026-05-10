import { downloadMediaMessage } from '@whiskeysockets/baileys';

export default {
    name: 'sticker',
    alias: ['st', 's'],
    description: 'Create sticker from image',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        
        if (!quoted?.imageMessage) {
            return sock.sendMessage(chatId, { text: '❌ Reply to an image with .sticker to create a sticker!' }, { quoted: msg });
        }
        
        try {
            const buffer = await downloadMediaMessage(
                { message: quoted },
                'buffer',
                {},
                { logger: { level: 'silent' } }
            );
            await sock.sendMessage(chatId, { sticker: buffer }, { quoted: msg });
        } catch (e) {
            await sock.sendMessage(chatId, { text: '❌ Failed to create sticker!' }, { quoted: msg });
        }
    }
};
