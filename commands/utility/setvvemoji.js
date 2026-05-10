import fs from 'fs';

const emojiFile = './data/vv_emoji.json';

function getEmoji() {
  try { if (fs.existsSync(emojiFile)) return JSON.parse(fs.readFileSync(emojiFile, 'utf8')).emoji; } catch(e) {}
  return '📥';
}

function setEmoji(emoji) {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data', { recursive: true });
  fs.writeFileSync(emojiFile, JSON.stringify({ emoji }));
}

export default {
  name: 'setvvemoji',
  description: 'Set custom emoji for VV command',
  category: 'utility',
  aliases: ['vvemoji', 'setemoji'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const emoji = args[0];
    if (!emoji) return sock.sendMessage(chatId, { text: `Current VV Emoji: ${getEmoji()}\n\nChange: .setvvemoji 🧛\n\n⚡ *Vampire Tech* 🧛` }, { quoted: msg });
    setEmoji(emoji);
    await sock.sendMessage(chatId, { text: `✅ VV Emoji set to: ${emoji}\n\n⚡ *Vampire Tech* 🧛` }, { quoted: msg });
  }
};
