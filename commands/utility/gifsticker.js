import { downloadMediaMessage } from '@whiskeysockets/baileys';

export default {
    name: 'gifsticker',
    alias: ['gif', 'gs', 'animatedsticker'],
    description: 'Create animated sticker from video/GIF',
    category: 'utility',
    async execute(sock, msg, args) {
        const chatId = msg.key.remoteJid;
        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        
        if (!quoted?.videoMessage) {
            return sock.sendMessage(chatId, { text: '❌ Reply to a video/GIF with .gifsticker!' }, { quoted: msg });
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
