import fs from "fs";
import path from "path";
import { downloadContentFromMessage } from "@whiskeysockets/baileys";

export default {
  name: "setpp",
  alias: ["setprofilepic", "setpic"],
  desc: "Change bot profile picture",
  category: "owner",
  usage: ".setpp [reply to image]",

  async execute(sock, m, args) {
    const chatId = m.key.remoteJid;
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    
    if (!quoted?.imageMessage) {
      return sock.sendMessage(chatId, { text: '❌ Reply to an image with .setpp' }, { quoted: m });
    }

    try {
      const tmpDir = path.join(process.cwd(), "tmp");
      if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

      const stream = await downloadContentFromMessage(quoted.imageMessage, "image");
      let buffer = Buffer.alloc(0);
      for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

      const imagePath = path.join(tmpDir, `pp_${Date.now()}.jpg`);
      fs.writeFileSync(imagePath, buffer);
      await sock.updateProfilePicture(sock.user.id, { url: imagePath });
      fs.unlinkSync(imagePath);

      await sock.sendMessage(chatId, { text: "✅ Profile picture updated! 🧛\n\n⚡ *Powered by Vampire Tech*" }, { quoted: m });
    } catch (error) {
      await sock.sendMessage(chatId, { text: `❌ Failed: ${error.message}` }, { quoted: m });
    }
  }
};
