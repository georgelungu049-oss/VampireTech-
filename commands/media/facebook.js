export default {
  name: 'facebook',
  description: 'Download Facebook videos',
  category: 'media',
  aliases: ['fb', 'fbdl', 'fbd'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const url = args[0];
    
    if (!url) return sock.sendMessage(chatId, { 
      text: `📥 *Facebook Downloader*\n\n.fb <facebook-url>\n\nExample: .fb https://www.facebook.com/share/v/xxx\n\n⚡ *Vampire Tech* 🧛` 
    }, { quoted: msg });

    try {
      const res = await fetch(`https://apis.xwolf.space/api/download/facebook?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      
      if (data.status && data.result) {
        const result = typeof data.result === 'string' ? data.result : JSON.stringify(data.result, null, 2);
        await sock.sendMessage(chatId, { 
          text: `📥 *Facebook Video*\n\n✅ Downloaded!\n🔗 ${result.substring(0, 300)}\n\n⚡ *Vampire Tech* 🧛` 
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, { 
          text: `❌ *Failed to download*\n\nMake sure the URL is a valid Facebook video.\n\n⚡ *Vampire Tech* 🧛` 
        }, { quoted: msg });
      }
    } catch(e) {
      await sock.sendMessage(chatId, { 
        text: `❌ *Error*\n${e.message}\n\nTry again later.\n\n⚡ *Vampire Tech* 🧛` 
      }, { quoted: msg });
    }
  }
};
