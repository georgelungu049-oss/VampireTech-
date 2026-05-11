import fs from 'fs';

export default {
  name: 'setbotname',
  description: 'Change bot display name',
  category: 'settings',
  aliases: ['botname'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const name = args.join(' ');
    
    if (!name) {
      return sock.sendMessage(chatId, { 
        text: `📝 *Set Bot Name*\n\nCurrent: ${process.env.BOT_NAME || 'Vampire MD'}\n\n.setbotname <new name>\n\n> *Powered by Vampire Tech*` 
      }, { quoted: msg });
    }
    
    // Update .env file
    try {
      let envContent = fs.readFileSync('.env', 'utf8');
      if (envContent.includes('BOT_NAME=')) {
        envContent = envContent.replace(/BOT_NAME=.*/, `BOT_NAME=${name}`);
      } else {
        envContent += `\nBOT_NAME=${name}`;
      }
      fs.writeFileSync('.env', envContent);
      process.env.BOT_NAME = name;
    } catch(e) {}
    
    await sock.sendMessage(chatId, { 
      text: `✅ Bot name changed to: *${name}*\n(Restart may be required)\n\n> *Powered by Vampire Tech*` 
    }, { quoted: msg });
  }
};
