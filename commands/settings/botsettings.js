export default {
  name:'botsettings',
  category:'settings',
  aliases:['allsettings','toggles'],
  async execute(sock, msg, args, prefix) {
    const c = msg.key.remoteJid;
    await sock.sendMessage(c, {
      text: `⚙️ *BOT SETTINGS PANEL*

🤖 *Automation:*
${prefix}autotyping on/off
${prefix}autorecording on/off
${prefix}autoreact on/off
${prefix}autoview on/off
${prefix}autoviewstatus on/off
${prefix}autostatus on/off

🛡️ *Protection:*
${prefix}antilink on/off
${prefix}anticall on/off

👥 *Group:*
${prefix}mute / ${prefix}unmute
${prefix}close / ${prefix}open

⚙️ *System:*
${prefix}setprefix <char>
${prefix}setbotname <name>
${prefix}setbio <text>

> *Vampire Tech* 🧛`
    }, { quoted: msg });
  }
};
