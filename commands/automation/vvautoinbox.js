import { downloadMediaMessage } from '@whiskeysockets/baileys';
import fs from 'fs';

const inboxFile = './data/vv_autoinbox.json';

function getConfig() {
  try { if (fs.existsSync(inboxFile)) return JSON.parse(fs.readFileSync(inboxFile, 'utf8')); } catch(e) {}
  return { enabled: true, saveToInbox: true };
}

function saveConfig(c) {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data', { recursive: true });
  fs.writeFileSync(inboxFile, JSON.stringify(c, null, 2));
}

export default {
  name: 'vvautoinbox',
  description: 'Auto-save view-once to inbox (always)',
  category: 'automation',
  aliases: ['autoinbox', 'vvauto'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const config = getConfig();
    const action = args[0]?.toLowerCase();
    if (action === 'off') { config.enabled = false; saveConfig(config); return sock.sendMessage(chatId, { text: '📥 VV Auto-Inbox DISABLED!' }, { quoted: msg }); }
    if (action === 'on') { config.enabled = true; saveConfig(config); return sock.sendMessage(chatId, { text: '📥 VV Auto-Inbox ENABLED! All VV go to DM.' }, { quoted: msg }); }
    return sock.sendMessage(chatId, { text: `📥 *VV Auto-Inbox*\nStatus: ${config.enabled?'✅ ON':'❌ OFF'}\n\n${prefix}vvautoinbox on/off\n\n⚡ *Vampire Tech* 🧛` }, { quoted: msg });
  }
};

export async function handleVVInbox(sock, msg) {
  const config = getConfig();
  if (!config.enabled) return false;
  const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  if (!quoted?.imageMessage && !quoted?.videoMessage) return false;
  try {
    const buffer = await downloadMediaMessage({ message: quoted }, 'buffer', {}, { logger: { level: 'silent' } });
    const userJid = msg.key.participant || msg.key.remoteJid;
    const dmJid = msg.key.participant ? msg.key.participant.replace('@g.us', '@s.whatsapp.net') : userJid;
    if (quoted.imageMessage) await sock.sendMessage(dmJid, { image: buffer, caption: '📥 *Auto-Saved*\n\n⚡ *Vampire Tech* 🧛' });
    else if (quoted.videoMessage) await sock.sendMessage(dmJid, { video: buffer, caption: '📥 *Auto-Saved*\n\n⚡ *Vampire Tech* 🧛' });
    return true;
  } catch(e) { return false; }
}
