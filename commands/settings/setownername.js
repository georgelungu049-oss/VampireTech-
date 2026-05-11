import fs from 'fs';
const ownerFile = './data/ownername.txt';

function getName() {
  try { return fs.readFileSync(ownerFile,'utf8').trim(); } catch(e) {}
  return 'Paxton';
}
function saveName(name) {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
  fs.writeFileSync(ownerFile, name);
}

export default {
  name: 'setownername',
  description: 'Change owner name',
  category: 'settings',
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const name = args.join(' ');
    if (!name) return sock.sendMessage(chatId, { text: `📝 Current: ${getName()}\n.setownername <name>\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    saveName(name);
    await sock.sendMessage(chatId, { text: `✅ Owner: *${name}*\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
