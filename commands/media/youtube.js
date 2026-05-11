export default {
  name: 'youtube',
  description: 'Download YouTube videos',
  category: 'media',
  aliases: ['ytdl', 'yt', 'ytb'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const url = args[0];
    
    if (!url) return sock.sendMessage(chatId, { 
      text: `📥 *YouTube Downloader*\n\n.yt <youtube-url>\n\nExample: .yt https://www.youtube.com/watch?v=xxx\n\n⚡ *Vampire Tech* 🧛` 
    }, { quoted: msg });

    try {
      const res = await fetch(`https://apis.xwolf.space/download/video?url=${encodeURIComponent(url)}&q=video`);
      const data = await res.json();
      
      if (data.status) {
        await sock.sendMessage(chatId, { 
          text: `📥 *YouTube Video*\n\n✅ Downloading...\n\n${JSON.stringify(data).substring(0, 300)}\n\n⚡ *Vampire Tech* 🧛` 
        }, { quoted: msg });
      } else {
        await sock.sendMessage(chatId, { 
          text: `❌ *Failed*\nMake sure it's a valid YouTube URL.\n\n⚡ *Vampire Tech* 🧛` 
        }, { quoted: msg });
      }
    } catch(e) {
      await sock.sendMessage(chatId, { 
        text: `❌ *Error*\n${e.message}\n\n⚡ *Vampire Tech* 🧛` 
      }, { quoted: msg });
    }
  }
};
