import { downloadMediaMessage } from '@whiskeysockets/baileys';

export default {
  name: 'vv2',
  description: 'Download view-once and send to DM',
  category: 'utility',
  aliases: ['viewonce2', 'savedm'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted) return sock.sendMessage(chatId, { text: '❌ Reply to view-once!' }, { quoted: msg });
    try {
      const buffer = await downloadMediaMessage({ message: quoted }, 'buffer', {}, { logger: { level: 'silent' } });
      const senderJid = msg.key.participant || chatId;
      const userDm = senderJid.includes('@g.us') ? msg.key.participant : chatId;
      if (quoted.imageMessage) await sock.sendMessage(userDm, { image: buffer, caption: '📥 Saved to DM\n\n⚡ *Vampire Tech* 🧛' });
      else if (quoted.videoMessage) await sock.sendMessage(userDm, { video: buffer, caption: '📥 Saved to DM\n\n⚡ *Vampire Tech* 🧛' });
      else return sock.sendMessage(chatId, { text: '❌ Not supported!' }, { quoted: msg });
      await sock.sendMessage(chatId, { text: '✅ Sent to your DM!' }, { quoted: msg });
    } catch (e) { await sock.sendMessage(chatId, { text: '❌ Failed!' }, { quoted: msg }); }
  }
};
