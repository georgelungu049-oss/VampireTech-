import fs from 'fs';
import path from 'path';
import { downloadMediaMessage } from '@whiskeysockets/baileys';

export default {
  name: 'vv',
  description: 'Download and resend view-once media',
  category: 'utility',
  aliases: ['viewonce', 'antiviewonce'],

  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    
    if (!quoted) {
      return sock.sendMessage(chatId, { text: '❌ Reply to a view-once message with .vv' }, { quoted: msg });
    }

    try {
      const buffer = await downloadMediaMessage(
        { message: quoted },
        'buffer',
        {},
        { logger: { level: 'silent' } }
      );

      if (!buffer || buffer.length === 0) {
        return sock.sendMessage(chatId, { text: '❌ Failed to download media.' }, { quoted: msg });
      }

      if (quoted.imageMessage) {
        await sock.sendMessage(chatId, { image: buffer, caption: '📥 *Retrieved by Vampire MD*\n⚡ *Powered by Vampire Tech* 🧛' }, { quoted: msg });
      } else if (quoted.videoMessage) {
        await sock.sendMessage(chatId, { video: buffer, caption: '📥 *Retrieved by Vampire MD*\n⚡ *Powered by Vampire Tech* 🧛' }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, { text: '❌ Not a supported media type.' }, { quoted: msg });
      }
    } catch (e) {
      await sock.sendMessage(chatId, { text: `❌ Error: ${e.message}` }, { quoted: msg });
    }
  }
};
