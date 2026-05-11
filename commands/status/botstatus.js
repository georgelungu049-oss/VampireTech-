import os from 'os';
export default { name: 'botstatus', description: 'Full bot system status', category: 'status', aliases: ['system','diagnostic','fullstatus'], async execute(sock, msg, args) { const chatId=msg.key.remoteJid; const uptime=process.uptime(); const h=Math.floor(uptime/3600); const m=Math.floor((uptime%3600)/60); const s=Math.floor(uptime%60); const ram=process.memoryUsage(); const cpu=os.cpus()[0]; const status=`╭━━━━━━━━━━━━━━━━━━━━━━━━╮
┃   🧛 *SYSTEM STATUS*      ┃
╰━━━━━━━━━━━━━━━━━━━━━━━━╯

🖥️ *System:*
▸ OS: ${os.type()} ${os.release()}
▸ CPU: ${cpu?.model?.substring(0,30)||'ARM'}
▸ Cores: ${os.cpus().length}
▸ Arch: ${os.arch()}

⚡ *Bot:*
▸ Name: Vampire MD
▸ Version: 2.0.0
▸ Owner: +27 70 427 8701
▸ Platform: Termux/Android

📊 *Performance:*
▸ Uptime: ${h}h ${m}m ${s}s
▸ RAM: ${(ram.heapUsed/1024/1024).toFixed(2)}MB / ${(ram.heapTotal/1024/1024).toFixed(2)}MB
▸ CPU Usage: ${(process.cpuUsage().user/1000000).toFixed(2)}s

📡 *Connection:*
▸ Status: 🟢 ONLINE
▸ Prefix: .

> *Powered by Vampire Tech*`; await sock.sendMessage(chatId,{text:status},{quoted:msg}); } };
