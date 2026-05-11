export default {
  name: 'ardoemenu',
  description: 'Ardoe/SavageMulla exclusive menu',
  category: 'owner',
  aliases: ['savage', 'mulla', 'ardeo'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    await sock.sendMessage(chatId, { 
      text: `╔══════════════════════════╗\n║   🩸 *SAVAGEMULLA MENU*   ║\n╚══════════════════════════╝\n\n👑 *Co-Owner Commands*\n\n👥 *Group Control:*\n${prefix}promote - Make admin\n${prefix}demote - Remove admin\n${prefix}kick - Remove member\n${prefix}ban - Ban member\n${prefix}warn - Warn member\n${prefix}tagall - Tag everyone\n${prefix}hidetag - Silent tag\n${prefix}mute - Mute group\n${prefix}unmute - Unmute group\n\n📢 *Broadcast:*\n${prefix}announce - Vampire announcement\n${prefix}broadcast - Send to all\n\n👤 *Users:*\n${prefix}block - Block user\n${prefix}unblock - Unblock user\n${prefix}checkuser - Check number\n\n🔗 *Links:*\n${prefix}channel - WhatsApp Channel\n${prefix}group - Community Group\n\n🩸 Co-Owner: SavageMulla\n👑 Owner: Paxton\n\n> *Powered by Vampire Tech*`
    }, { quoted: msg });
  }
};
