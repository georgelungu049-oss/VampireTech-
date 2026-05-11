import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let giftedBtns;
try { giftedBtns = require('gifted-btns'); } catch {}

export default {
  name: 'getjid',
  description: 'Get the JID of a chat, user, group or channel',
  category: 'tools',
  aliases: ['jid', 'id'],

  async execute(sock, m, args) {
    const chatJid = m.key.remoteJid;
    try {
      let resolvedJid = chatJid;
      const quotedParticipant = m.message?.extendedTextMessage?.contextInfo?.participant;
      const mentionedJid = m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

      if (quotedParticipant) resolvedJid = await resolveJid(sock, quotedParticipant);
      else if (mentionedJid) resolvedJid = await resolveJid(sock, mentionedJid);
      else if (args[0]) {
        const raw = args.join(' ').trim();
        const clean = raw.replace(/\D/g, '');
        if (clean.length >= 7) resolvedJid = `${clean}@s.whatsapp.net`;
      } else {
        const sender = m.key.participant || chatJid;
        resolvedJid = await resolveJid(sock, sender);
      }

      await sock.sendMessage(chatJid, { text: `🆔 *JID*\n\`${resolvedJid}\`\n\n> *Powered by Vampire Tech*` }, { quoted: m });
    } catch (err) {
      await sock.sendMessage(chatJid, { text: `❌ ${err.message}` }, { quoted: m });
    }
  }
};

export async function resolveJid(sock, inputJid, chatJid = null) {
    if (!inputJid) return inputJid;
    if (inputJid.endsWith('@g.us') || inputJid.endsWith('@newsletter')) return inputJid;
    const number = inputJid.split('@')[0].split(':')[0].replace(/\D/g, '');
    return `${number}@s.whatsapp.net`;
}
