import fs from 'fs';
const footerFile = './data/footer.txt';

function getFooter() {
  try { return fs.readFileSync(footerFile,'utf8').trim(); } catch(e) {}
  return '> *Powered by Vampire Tech*';
}
function saveFooter(text) {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
  fs.writeFileSync(footerFile, text);
}

export default {
  name: 'setfooter',
  description: 'Change footer text',
  category: 'settings',
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const footer = args.join(' ');
    if (!footer) return sock.sendMessage(chatId, { text: `📝 Current: ${getFooter()}\n.setfooter <text>\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    saveFooter(footer);
    await sock.sendMessage(chatId, { text: `✅ Footer: "${footer}"\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
