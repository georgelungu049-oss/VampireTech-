import fs from 'fs';

const antiLinkFile = './data/antilink_groups.json';

function getAntiLinkGroups() {
  try { if (fs.existsSync(antiLinkFile)) return JSON.parse(fs.readFileSync(antiLinkFile, 'utf8')); } catch(e) {}
  return {};
}

function saveAntiLinkGroups(data) {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data', { recursive: true });
  fs.writeFileSync(antiLinkFile, JSON.stringify(data, null, 2));
}

export default {
  name: 'antilink',
  description: 'Auto-delete WhatsApp links in group',
  category: 'group',
  aliases: ['antilinkgc', 'nolink', 'linkblock'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    if (!chatId.endsWith('@g.us')) return sock.sendMessage(chatId, { text: '❌ Group only!' }, { quoted: msg });
    
    const action = args[0]?.toLowerCase() || 'on';
    const groups = getAntiLinkGroups();
    
    if (action === 'on' || action === 'enable') {
      groups[chatId] = { enabled: true, warn: args[1] !== 'nowarn' };
      saveAntiLinkGroups(groups);
      return sock.sendMessage(chatId, { text: '🔗 *Anti-Link ENABLED!*\nWhatsApp links will be deleted.\n\n⚡ *Vampire Tech* 🧛' }, { quoted: msg });
    }
    
    if (action === 'off' || action === 'disable') {
      delete groups[chatId];
      saveAntiLinkGroups(groups);
      return sock.sendMessage(chatId, { text: '🔗 *Anti-Link DISABLED!*\n\n⚡ *Vampire Tech* 🧛' }, { quoted: msg });
    }
    
    if (action === 'status') {
      const status = groups[chatId]?.enabled ? '✅ ENABLED' : '❌ DISABLED';
      return sock.sendMessage(chatId, { text: `🔗 *Anti-Link Status:* ${status}\n\n${prefix}antilink on/off\n\n⚡ *Vampire Tech* 🧛` }, { quoted: msg });
    }
    
    return sock.sendMessage(chatId, { text: `🔗 *Anti-Link*\n\n${prefix}antilink on\n${prefix}antilink off\n${prefix}antilink status\n\n⚡ *Vampire Tech* 🧛` }, { quoted: msg });
  }
};
