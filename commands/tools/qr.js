export default {
  name: 'qr',
  description: 'Generate QR code from text',
  category: 'tools',
  aliases: ['qrcode', 'qrg'],
  async execute(sock, msg, args) {
    const chatId = msg.key.remoteJid;
    const text = args.join(' ') || 'Vampire MD';
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
    await sock.sendMessage(chatId, { image: { url: qrUrl }, caption: `📱 QR: ${text}\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
  }
};
