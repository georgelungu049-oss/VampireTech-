import fs from 'fs';

const configFile = './data/system_antilink.json';
const linkPattern = /chat\.whatsapp\.com|wa\.me|whatsapp\.com\/channel|https?:\/\/chat\.whatsapp\.com/i;

function getConfig() {
  try { if (fs.existsSync(configFile)) return JSON.parse(fs.readFileSync(configFile, 'utf8')); } catch(e) {}
  return { enabled: true, allGroups: true, action: 'delete', warn: true };
}

function saveConfig(c) {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data', { recursive: true });
  fs.writeFileSync(configFile, JSON.stringify(c, null, 2));
}

export default {
  name: 'antilinksystem',
  description: 'System-wide anti-link (always active)',
  category: 'automation',
  aliases: ['systemantilink', 'globalantilink'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const config = getConfig();
    const action = args[0]?.toLowerCase();

    if (action === 'off') { config.enabled = false; saveConfig(config); return sock.sendMessage(chatId, { text: '🔗 System Anti-Link DISABLED!' }, { quoted: msg }); }
    if (action === 'on') { config.enabled = true; saveConfig(config); return sock.sendMessage(chatId, { text: '🔗 System Anti-Link ENABLED! (All groups)' }, { quoted: msg }); }
    if (action === 'status') return sock.sendMessage(chatId, { text: `🔗 System Anti-Link: ${config.enabled?'✅ ON':'❌ OFF'}\nGroups: ${config.allGroups?'ALL':config.groups?.length||0}\nAction: ${config.action}` }, { quoted: msg });

    return sock.sendMessage(chatId, { text: `🔗 *System Anti-Link*\n\n${prefix}antilinksystem on/off/status\nCurrently: ${config.enabled?'✅ ON':'❌ OFF'}\n\n⚡ *Vampire Tech* 🧛` }, { quoted: msg });
  }
};

// Anti-link handler
export function handleAntiLink(sock, msg) {
  const config = getConfig();
  if (!config.enabled) return false;
  const chatId = msg.key.remoteJid;
  if (!chatId.endsWith('@g.us')) return false;
  const text = msg.message?.conversation || msg.message?.extendedTextMessage?.text || msg.message?.imageMessage?.caption || '';
  if (!linkPattern.test(text)) return false;
  // Delete the message
  sock.sendMessage(chatId, { delete: msg.key }).catch(() => {});
  if (config.warn) sock.sendMessage(chatId, { text: `🚫 @${(msg.key.participant||msg.key.remoteJid).split('@')[0]} Links not allowed!`, mentions: [msg.key.participant||msg.key.remoteJid] }).catch(() => {});
  return true;
}
