export default {
  name: 'download',
  description: 'Download video from multiple platforms',
  category: 'media',
  aliases: ['dl', 'getvideo'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const url = args[0];
    
    if (!url) return sock.sendMessage(chatId, { 
      text: `📥 *Video Downloader*\n\n.dl <url>\n\nSupports: YouTube, Facebook, TikTok, Instagram\n\n⚡ *Vampire Tech* 🧛` 
    }, { quoted: msg });

    // Detect platform
    let platform = 'unknown';
    if (url.includes('youtube.com') || url.includes('youtu.be')) platform = 'YouTube';
    else if (url.includes('facebook.com') || url.includes('fb.com')) platform = 'Facebook';
    else if (url.includes('tiktok.com')) platform = 'TikTok';
    else if (url.includes('instagram.com')) platform = 'Instagram';

    await sock.sendMessage(chatId, { 
      text: `📥 *Downloading from ${platform}...*\n\n🔗 ${url}\n\n⏳ Please wait...\n\n⚡ *Vampire Tech* 🧛` 
    }, { quoted: msg });

    try {
      let apiUrl;
      if (platform === 'Facebook') {
        apiUrl = `https://apis.xwolf.space/api/download/facebook?url=${encodeURIComponent(url)}`;
      } else {
        apiUrl = `https://apis.xwolf.space/download/video?url=${encodeURIComponent(url)}&q=${platform}`;
      }

      const res = await fetch(apiUrl);
      const data = await res.json();
      
      if (data.status) {
        await sock.sendMessage(chatId, { 
          text: `✅ *${platform} Video Downloaded!*\n\nUse the link above to view.\n\n⚡ *Vampire Tech* 🧛` 
        }, { quoted: msg });
      } else {
        // Fallback: send the direct API link
        await sock.sendMessage(chatId, { 
          text: `🔗 *Download Link*\n\nClick to download your ${platform} video:\n${apiUrl}\n\n⚡ *Vampire Tech* 🧛` 
        }, { quoted: msg });
      }
    } catch(e) {
      await sock.sendMessage(chatId, { 
        text: `❌ *Download failed*\n\nTry using a different link or platform.\n\n⚡ *Vampire Tech* 🧛` 
      }, { quoted: msg });
    }
  }
};
