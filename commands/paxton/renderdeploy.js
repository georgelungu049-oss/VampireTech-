export default {
  name: 'renderdeploy',
  description: 'How to deploy on Render',
  category: 'paxton',
  aliases: ['render', 'deployrender'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, {
      text: `🚀 *DEPLOY ON RENDER*\n\n` +
            `1. Fork repo on GitHub\n` +
            `📂 https://github.com/georgelungu049-oss/VampireTech-\n\n` +
            `2. Go to render.com\n` +
            `3. New Web Service → Connect GitHub\n` +
            `4. Select VampireTech- repo\n\n` +
            `⚙️ *Settings:*\n` +
            `Build: npm install\n` +
            `Start: npm start\n` +
            `Env: AUTO_LOGIN=true\n` +
            `Env: SESSION_ID=your-session\n\n` +
            `5. Deploy! 🎉\n\n` +
            `> *Powered by Vampire Tech*`
    }, { quoted: msg });
  }
};
