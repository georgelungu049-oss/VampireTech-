import fs from 'fs';

export default {
  name: 'setprefix',
  description: 'Change prefix to any character or emoji',
  category: 'settings',
  aliases: ['prefix', 'changeprefix'],
  ownerOnly: true,
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const newPrefix = args[0];
    
    if (!newPrefix) {
      const current = process.env.PREFIX || '.';
      return sock.sendMessage(chatId, { 
        text: `💬 *Prefix Settings*\n\nCurrent: ${current === '' ? 'none (prefixless)' : `"${current}"`}\n\n` +
              `.setprefix ! - Set to !\n` +
              `.setprefix . - Set to .\n` +
              `.setprefix 🧛 - Set to emoji\n` +
              `.setprefix none - Remove prefix\n\n` +
              `> *Powered by Vampire Tech*` 
      }, { quoted: msg });
    }
    
    if (newPrefix === 'none' || newPrefix === 'null' || newPrefix === 'off') {
      try {
        let env = fs.readFileSync('.env','utf8');
        env = env.includes('PREFIX=') ? env.replace(/PREFIX=.*/,'PREFIX=') : env + '\nPREFIX=';
        fs.writeFileSync('.env', env);
        process.env.PREFIX = '';
      } catch(e) {}
      return sock.sendMessage(chatId, { 
        text: `🔓 *Prefix removed!*\nPrefixless mode activated.\nType commands without any prefix.\n\n> *Powered by Vampire Tech*` 
      }, { quoted: msg });
    }
    
    // Accept emojis and any character
    try {
      let env = fs.readFileSync('.env','utf8');
      env = env.includes('PREFIX=') ? env.replace(/PREFIX=.*/,'PREFIX='+newPrefix) : env + '\nPREFIX='+newPrefix;
      fs.writeFileSync('.env', env);
      process.env.PREFIX = newPrefix;
    } catch(e) {}
    
    await sock.sendMessage(chatId, { 
      text: `✅ *Prefix changed!*\n\nNew: ${newPrefix}\nExample: ${newPrefix}ping\n\n> *Powered by Vampire Tech*` 
    }, { quoted: msg });
  }
};
