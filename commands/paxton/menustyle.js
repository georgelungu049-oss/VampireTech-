export default {
  name: 'menustyle',
  description: 'Change menu display style',
  category: 'paxton',
  aliases: ['menudesign', 'stylemenu', 'setmenu'],
  async execute(sock, msg, args, prefix) {
    const chatId = msg.key.remoteJid;
    const style = args[0]?.toLowerCase();
    
    const styles = {
      '1': 'Classic Box',
      '2': 'Minimal Clean',
      '3': 'Arrow List',
      '4': 'Double Line',
      '5': 'Vampire Dark',
      'box': 'Classic Box',
      'clean': 'Minimal Clean',
      'arrow': 'Arrow List',
      'double': 'Double Line',
      'dark': 'Vampire Dark'
    };
    
    if (!style) {
      return sock.sendMessage(chatId, {
        text: `🎨 *MENU STYLES*\n\n${prefix}menustyle 1 - Classic Box\n${prefix}menustyle 2 - Minimal Clean\n${prefix}menustyle 3 - Arrow List\n${prefix}menustyle 4 - Double Line\n${prefix}menustyle 5 - Vampire Dark\n\nCurrent: Vampire Dark\n\n> *Powered by Vampire Tech*`
      }, { quoted: msg });
    }
    
    const styleName = styles[style] || 'Vampire Dark';
    
    // Show preview based on selected style
    let preview = '';
    if (style === '1' || style === 'box') {
      preview = '╔══════════════════════╗\n║   🧛 VAMPIRE MD       ║\n╠══════════════════════╣\n║ 👑 Paxton             ║\n║ 💬 .prefix            ║\n╚══════════════════════╝';
    } else if (style === '2' || style === 'clean') {
      preview = '🧛 VAMPIRE MD\n━━━━━━━━━━━━━━━━\n👑 Paxton | 💬 .';
    } else if (style === '3' || style === 'arrow') {
      preview = '╭── 🧛 VAMPIRE MD ──╮\n│ 👑 Paxton          │\n│ 💬 Prefix : .      │\n╰────────────────────╯';
    } else if (style === '4' || style === 'double') {
      preview = '╔══════════════════╗\n║ 🧛 VAMPIRE MD     ║\n╚══════════════════╝\n┌─ 👑 Paxton\n├─ 💬 Prefix : .\n└─ ⚡ Vampire Tech';
    } else {
      preview = '▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄\n█ 🧛 VAMPIRE MD v2.0 █\n█ 👑 Paxton  💬 .     █\n▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀';
    }
    
    await sock.sendMessage(chatId, {
      text: `✅ *Menu Style: ${styleName}*\n\nPreview:\n${preview}\n\n> *Powered by Vampire Tech*`
    }, { quoted: msg });
  }
};
