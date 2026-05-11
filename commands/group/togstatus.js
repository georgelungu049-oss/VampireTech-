import { downloadContentFromMessage, generateWAMessageContent, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import crypto from 'crypto';

async function downloadToBuffer(message, type) {
    const stream = await downloadContentFromMessage(message, type);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);
    return buffer;
}

async function buildPayloadFromQuoted(quotedMessage) {
    if (quotedMessage.videoMessage) return { video: await downloadToBuffer(quotedMessage.videoMessage, 'video'), caption: quotedMessage.videoMessage.caption || '' };
    if (quotedMessage.imageMessage) return { image: await downloadToBuffer(quotedMessage.imageMessage, 'image'), caption: quotedMessage.imageMessage.caption || '' };
    if (quotedMessage.audioMessage) return { audio: await downloadToBuffer(quotedMessage.audioMessage, 'audio') };
    if (quotedMessage.conversation || quotedMessage.extendedTextMessage?.text) return { text: quotedMessage.conversation || quotedMessage.extendedTextMessage?.text || '' };
    return null;
}

async function sendGroupStatus(conn, jid, content) {
    const inside = await generateWAMessageContent(content, { upload: conn.waUploadToServer });
    const secret = crypto.randomBytes(32);
    const m = generateWAMessageFromContent(jid, { messageContextInfo: { messageSecret: secret }, groupStatusMessageV2: { message: { ...inside, messageContextInfo: { messageSecret: secret } } } }, {});
    await conn.relayMessage(jid, m.message, { messageId: m.key.id });
}

export default {
    name: 'togstatus',
    aliases: ['swgc', 'groupstatus', 'gs', 'gstatus'],
    description: 'Send group status',
    category: 'group',
    async execute(sock, m, args, PREFIX) {
        const senderJid = m.key.remoteJid;
        const inGroup = senderJid.endsWith('@g.us');
        const quotedMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const textAfterCommand = args.join(' ').trim();
        let groupJid = inGroup ? senderJid : null;
        if (!inGroup && !textAfterCommand.match(/^\d{10,}/)) return sock.sendMessage(senderJid, { text: '❌ Provide group JID!' }, { quoted: m });
        if (!inGroup) { const match = textAfterCommand.match(/^(\d{10,})/); if (match) groupJid = match[1] + '@g.us'; }
        if (!quotedMessage && !textAfterCommand) return;
        let payload = quotedMessage ? await buildPayloadFromQuoted(quotedMessage) : { text: textAfterCommand };
        if (!payload) return sock.sendMessage(senderJid, { text: '❌ Failed!' }, { quoted: m });
        await sendGroupStatus(sock, groupJid, payload);
        await sock.sendMessage(senderJid, { text: '✅ Status posted!\n\n> *Powered by Vampire Tech*' }, { quoted: m });
    }
};
