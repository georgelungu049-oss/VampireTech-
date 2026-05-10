import { downloadMediaMessage } from '@whiskeysockets/baileys';
import fs from 'fs';

const emojiFile = './data/vv_emoji.json';
const triggerEmojis = ['📥', '💾', '⬇️', '❤️', '🤔', '😏', '😋', '🔥', '💀', '🧛', '🖤', '😍', '🥵', '👀', '💕', '🫶'];

function getEmoji() {
  try { if (fs.existsSync(emojiFile)) return JSON.parse(fs.readFileSync(emojiFile, 'utf8')).emoji; } catch(e) {}
  return '📥';
}

export default {
  name: 'autovvemoji',
  description: 'Reply with emoji to view-once to save it',
  category: 'automation',
  aliases: ['emojivv', 'reactvv'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, { 
      text: `📥 *Emoji VV Active!*\n\nReply to a view-once message with any of these emojis to save it:\n${triggerEmojis.join(' ')}\n\nSet your emoji: .setvvemoji ❤️\n\n⚡ *Vampire Tech* 🧛` 
    }, { quoted: msg });
  }
};

// Auto-detect emoji reply to view-once
export async function handleEmojiVV(sock, msg) {
  const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || '';
  if (!text || text.length > 5) return false;
  
  const isEmoji = triggerEmojis.some(e => text.includes(e));
  if (!isEmoji) return false;

  const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  if (!quoted?.imageMessage && !quoted?.videoMessage) return false;

  const chatId = msg.key.remoteJid;
  const emoji = getEmoji();

  try {
    const buffer = await downloadMediaMessage({ message: quoted }, 'buffer', {}, { logger: { level: 'silent' } });
    if (quoted.imageMessage) await sock.sendMessage(chatId, { image: buffer, caption: emoji });
    else if (quoted.videoMessage) await sock.sendMessage(chatId, { video: buffer, caption: emoji });
    return true;
  } catch(e) { return false; }
}
