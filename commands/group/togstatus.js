import { downloadContentFromMessage, generateWAMessageContent, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import crypto from 'crypto';

async function downloadToBuffer(message, type) {
    const stream = await downloadContentFromMessage(message, type);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    return buffer;
}

async function buildPayloadFromQuoted(quotedMessage) {
    if (quotedMessage.videoMessage) {
        const buffer = await downloadToBuffer(quotedMessage.videoMessage, 'video');
        return { video: buffer, caption: quotedMessage.videoMessage.caption || '', gifPlayback: quotedMessage.videoMessage.gifPlayback || false, mimetype: quotedMessage.videoMessage.mimetype || 'video/mp4' };
    }
    if (quotedMessage.imageMessage) {
        const buffer = await downloadToBuffer(quotedMessage.imageMessage, 'image');
        return { image: buffer, caption: quotedMessage.imageMessage.caption || '' };
    }
    if (quotedMessage.audioMessage) {
        const buffer = await downloadToBuffer(quotedMessage.audioMessage, 'audio');
        return { audio: buffer, mimetype: quotedMessage.audioMessage.mimetype || 'audio/mpeg', ptt: quotedMessage.audioMessage.ptt || false };
    }
    if (quotedMessage.stickerMessage) {
        const buffer = await downloadToBuffer(quotedMessage.stickerMessage, 'sticker');
        return { sticker: buffer };
    }
    if (quotedMessage.conversation || quotedMessage.extendedTextMessage?.text) {
        return { text: quotedMessage.conversation || quotedMessage.extendedTextMessage?.text || '' };
    }
    return null;
}

async function sendGroupStatus(conn, jid, content) {
    const inside = await generateWAMessageContent(content, { upload: conn.waUploadToServer });
    const messageSecret = crypto.randomBytes(32);
    const m = generateWAMessageFromContent(jid, {
        messageContextInfo: { messageSecret },
        groupStatusMessageV2: { message: { ...inside, messageContextInfo: { messageSecret } } }
    }, {});
    await conn.relayMessage(jid, m.message, { messageId: m.key.id });
    return m;
}

export default {
    name: 'togstatus',
    aliases: ['swgc', 'groupstatus', 'tosgroup', 'gs', 'gstatus', 'togroupstatus'],
    description: 'Send group status updates',
    category: 'group',
    async execute(sock, m, args, PREFIX, extra) {
        const senderJid = m.key.remoteJid;
        const inGroup = senderJid.endsWith('@g.us');
        const quotedMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const textAfterCommand = args.join(' ').trim();
        let groupJid = inGroup ? senderJid : null;

        if (!inGroup && !textAfterCommand.match(/^\d{10,}(?:-\d+)?(@g\.us)?/)) {
            return sock.sendMessage(senderJid, { text: `❌ Provide a group JID!\nExample: .togstatus 120363424761834@g.us Hello!` }, { quoted: m });
        }
        if (!inGroup) {
            const match = textAfterCommand.match(/^(\d{10,}(?:-\d+)?(@g\.us)?)/);
            if (match) { groupJid = match[1].includes('@') ? match[1] : match[1] + '@g.us'; }
        }

        if (!quotedMessage && !textAfterCommand) return;

        let payload = quotedMessage ? await buildPayloadFromQuoted(quotedMessage) : { text: textAfterCommand };
        if (!payload) return sock.sendMessage(senderJid, { text: '❌ Could not process!' }, { quoted: m });

        await sendGroupStatus(sock, groupJid, payload);
        await sock.sendMessage(senderJid, { text: '✅ Group status posted!' }, { quoted: m });
    }
};
