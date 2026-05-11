import fs from 'fs';
import path from 'path';

export default {
  name: 'getsession',
  description: 'Get session ID for deployment',
  category: 'owner',
  aliases: ['session', 'sessionid', 'creds'],
  ownerOnly: true,
  
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    
    try {
      const sessionPath = path.join(process.cwd(), 'session', 'creds.json');
      
      if (!fs.existsSync(sessionPath)) {
        return sock.sendMessage(chatId, { 
          text: '❌ No session found! Pair the bot first.' 
        }, { quoted: msg });
      }
      
      const creds = JSON.parse(fs.readFileSync(sessionPath, 'utf8'));
      const sessionID = Buffer.from(JSON.stringify(creds, null, 0)).toString('base64');
      
      await sock.sendMessage(chatId, { 
        text: `🔐 *SESSION ID*\n\n\`\`\`VAMPIRE-MD:${sessionID.substring(0, 100)}...\`\`\`\n\n📋 *Full session sent in next message*\n\n> *Powered by Vampire Tech*` 
      }, { quoted: msg });
      
      // Send full session as text file
      await sock.sendMessage(chatId, {
        document: Buffer.from(JSON.stringify(creds, null, 2)),
        fileName: 'vampire-md-session.json',
        mimetype: 'application/json',
        caption: '📁 *Vampire MD Session File*\n\nUse this to deploy without pairing!\n\n> *Powered by Vampire Tech*'
      }, { quoted: msg });
      
    } catch (e) {
      await sock.sendMessage(chatId, { 
        text: `❌ Error: ${e.message}` 
      }, { quoted: msg });
    }
  }
};
