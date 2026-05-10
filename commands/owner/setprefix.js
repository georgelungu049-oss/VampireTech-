export default {
  name: 'setprefix',
  description: 'Change bot prefix or set prefixless mode',
  category: 'owner',
  aliases: ['prefix', 'changeprefix', 'newprefix', 'noprefix'],
  ownerOnly: true,
  async execute(sock, msg, args, prefix, extra) {
    const chatId = msg.key.remoteJid;
    const input = args[0]?.toLowerCase();
    
    if (!input) {
      return sock.sendMessage(chatId, { 
        text: `💬 *PREFIX SETTINGS*\n\nCurrent: *${prefix || 'prefixless'}*\n\n.setprefix ! - Set to !\n.setprefix . - Set to .\n.setprefix none - Prefixless mode\n.setprefix reset - Default prefix\n\n⚡ *Powered by Vampire Tech* 🧛` 
      }, { quoted: msg });
    }
    
    // Prefixless mode
    if (input === 'none' || input === 'null' || input === 'prefixless' || input === 'off' || input === 'remove') {
      if (extra?.updatePrefix) {
        extra.updatePrefix('');
      }
      return sock.sendMessage(chatId, { text: `🔓 *PREFIXLESS MODE ENABLED!*\n\nNow commands work WITHOUT any prefix!\nJust type: ping, menu, help\n\n.setprefix <char> to add prefix back\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    }
    
    // Reset to default
    if (input === 'reset' || input === 'default') {
      if (extra?.updatePrefix) {
        extra.updatePrefix('.');
      }
      return sock.sendMessage(chatId, { text: `🔄 *Prefix reset to default:* \".\"\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
    }
    
    // Custom prefix
    if (input.length > 3) {
      return sock.sendMessage(chatId, { text: '❌ Prefix must be 1-3 characters!' }, { quoted: msg });
    }
    
    if (extra?.updatePrefix) {
      const result = extra.updatePrefix(input);
      if (result.success) {
        return sock.sendMessage(chatId, { text: `✅ Prefix changed to: *${input}*\n\nOld prefix: ${result.oldPrefix}\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
      }
    }
    
    await sock.sendMessage(chatId, { text: `✅ Prefix set to: *${input}*\n\n⚡ *Powered by Vampire Tech* 🧛` }, { quoted: msg });
  }
};
