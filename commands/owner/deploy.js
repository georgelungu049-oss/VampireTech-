export default {
  name: 'deploy',
  description: 'Show deploy platforms',
  category: 'owner',
  aliases: ['platforms', 'hosting'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, { 
      text: `🚀 *DEPLOY VAMPIRE MD*\n\n` +
            `📱 *Termux:*\napt install git nodejs -y\ngit clone repo\ncd VampireTech-\nnpm install && npm start\n\n` +
            `☁️ *Heroku:*\nhttps://heroku.com/deploy\n\n` +
            `⚡ *Render:*\nhttps://render.com/deploy\n\n` +
            `🚂 *Railway:*\nhttps://railway.app/new\n\n` +
            `🔄 *Replit:*\nhttps://replit.com/github/VampireTech-\n\n` +
            `🐱 *Katabump:*\nImport from GitHub\n\n` +
            `⚡ *Powered by Vampire Tech* 🧛`
    }, { quoted: msg });
  }
};
