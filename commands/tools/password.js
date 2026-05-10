export default {
  name: 'password',
  description: 'Generate strong password',
  category: 'tools',
  aliases: ['pwd', 'passgen'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const length = parseInt(args[0]) || 16;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let pass = '';
    for (let i = 0; i < length; i++) pass += chars[Math.floor(Math.random() * chars.length)];
    await sock.sendMessage(chatId, { text: `🔐 *Password (${length} chars)*\n\`${pass}\`\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
  }
};
