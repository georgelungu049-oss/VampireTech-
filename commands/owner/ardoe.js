export default {
  name: 'ardoe',
  description: 'SavageMulla profile',
  category: 'owner',
  aliases: ['savagemulla', 'mulla'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, { 
      text: `🩸 *Ardoe (SavageMulla)*\n\n👑 Co-Owner of Vampire MD\n📞 +263 77 669 9348\n🇿🇼 Zimbabwe\n🟡 Full Admin Access\n\n"The Savage behind Vampire Tech"\n\n> *Powered by Vampire Tech*`
    }, { quoted: msg });
  }
};
