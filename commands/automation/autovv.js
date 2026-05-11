import { downloadMediaMessage } from '@whiskeysockets/baileys';

const autoVV = new Set();

export default {
  name: 'autovv',
  description: 'Auto save ALL view-once automatically',
  category: 'automation',
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const action = args[0]?.toLowerCase() || 'on';
    if (action === 'on') { autoVV.add(chatId); return sock.sendMessage(chatId, { text: '📥 Auto-VV ENABLED! All view-once auto-saved.\n\n> *Powered by Vampire Tech*' }, { quoted: msg }); }
    if (action === 'off') { autoVV.delete(chatId); return sock.sendMessage(chatId, { text: '📥 Auto-VV DISABLED!\n\n> *Powered by Vampire Tech*' }, { quoted: msg }); }
    return sock.sendMessage(chatId, { text: '📥 .autovv on/off\n\n> *Powered by Vampire Tech*' }, { quoted: msg });
  }
};

export async function handleAutoVV(sock, msg) {
  const chatId = msg.key.remoteJid;
  if (!autoVV.has(chatId)) return false;
  const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  if (!quoted?.imageMessage && !quoted?.videoMessage) return false;
  try {
    const buffer = await downloadMediaMessage({ message: quoted }, 'buffer', {}, { logger: { level: 'silent' } });
    if (quoted.imageMessage) await sock.sendMessage(chatId, { image: buffer, caption: '📥 Auto-Saved' });
    else if (quoted.videoMessage) await sock.sendMessage(chatId, { video: buffer, caption: '📥 Auto-Saved' });
    return true;
  } catch(e) { return false; }
}
