import express from 'express';
import { makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion, Browsers, DisconnectReason } from '@whiskeysockets/baileys';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import qrcode from 'qrcode';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.static('public'));

const pairSessions = {};

if (!fs.existsSync('./sessions')) fs.mkdirSync('./sessions', { recursive: true });

// Serve pairing page
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>🧛 Vampire MD - Get Session ID</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0000;color:#fff;font-family:Arial;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px}
.container{background:#111;border:2px solid red;border-radius:20px;padding:30px;max-width:480px;width:100%;box-shadow:0 0 50px rgba(255,0,0,.3)}
h1{color:red;text-align:center;font-size:30px;margin-bottom:5px}
.sub{color:#999;text-align:center;margin-bottom:20px;font-size:14px}
.step{display:none}
.step.active{display:block}
input{width:100%;padding:14px;background:#000;border:1px solid red;border-radius:10px;color:#fff;font-size:18px;margin:10px 0;text-align:center;outline:none}
select{width:100%;padding:14px;background:#000;border:1px solid red;border-radius:10px;color:#fff;font-size:16px;margin:10px 0;text-align:center;outline:none}
button{width:100%;padding:14px;background:red;border:none;border-radius:10px;color:#fff;font-size:16px;font-weight:bold;cursor:pointer;margin:5px 0}
button:hover{background:#c00}
button:disabled{opacity:.5}
.code-box{font-size:38px;font-weight:bold;color:red;letter-spacing:6px;padding:15px;background:#000;border-radius:10px;margin:15px 0;border:1px solid red;text-align:center;font-family:monospace}
.session-box{font-size:12px;color:#0f0;padding:15px;background:#000;border-radius:10px;margin:15px 0;border:1px solid #0f0;word-break:break-all;max-height:150px;overflow-y:auto;font-family:monospace}
.qr-box{text-align:center;margin:15px 0}
.qr-box img{max-width:250px;border-radius:10px}
.info{color:#999;font-size:12px;margin:10px 0;text-align:center}
.success{color:#0f0;font-size:18px;font-weight:bold;text-align:center}
.footer{text-align:center;color:#555;font-size:11px;margin-top:15px}
.spinner{border:3px solid #333;border-top:3px solid red;border-radius:50%;width:30px;height:30px;animation:spin 1s linear infinite;margin:15px auto}
@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
.tabs{display:flex;gap:5px;margin-bottom:15px}
.tab{flex:1;padding:10px;background:#000;border:1px solid #333;border-radius:8px;color:#999;cursor:pointer;text-align:center;font-size:13px}
.tab.active{background:red;color:#fff;border-color:red}
</style>
</head><body>
<div class="container">
<h1>🧛 VAMPIRE MD</h1>
<p class="sub">Session ID Generator</p>

<div class="tabs">
<div class="tab active" onclick="switchTab('pairing')">🔐 Pairing Code</div>
<div class="tab" onclick="switchTab('qr')">📱 QR Code</div>
</div>

<div id="pairing-tab" class="step active">
<input type="tel" id="number" placeholder="WhatsApp Number (e.g., 27704278701)">
<button onclick="startPair()">🔐 Get Pairing Code</button>
</div>

<div id="qr-tab" class="step">
<button onclick="startQR()">📱 Generate QR Code</button>
<div class="qr-box" id="qrDisplay"></div>
</div>

<div id="s2" class="step">
<p class="success">📱 PAIRING CODE READY!</p>
<div class="code-box" id="codeDisplay">------</div>
<div class="info">1. Open WhatsApp<br>2. Settings → Linked Devices<br>3. Link a Device<br>4. Enter code above</div>
<div class="spinner" id="spinner"></div>
<p id="waitMsg" style="color:#fa0;text-align:center">Waiting for connection...</p>
</div>

<div id="s3" class="step">
<p class="success">✅ CONNECTED!</p>
<p style="text-align:center;color:#fff;font-weight:bold">📋 YOUR SESSION ID:</p>
<div class="session-box" id="sessionDisplay">Generating...</div>
<button onclick="copySession()" style="background:#0a0;border-color:#0a0">📋 COPY SESSION ID</button>
<div class="info" style="color:#fa0">
<b>🚀 HOW TO DEPLOY:</b><br>
1. Copy Session ID above<br>
2. Deploy on Katabump/Panel<br>
3. Set SESSION_ID in env vars<br>
4. Bot runs 24/7!
</div>
<div class="info" style="color:#fa0">📱 Session also sent to your WhatsApp!</div>
<button onclick="location.reload()">🔄 Generate New</button>
</div>

<div class="footer">⚡ Powered by Vampire Tech 🧛</div>
</div>
<script>
let checkInterval, currentNumber = '';
function switchTab(t){document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));event.target.classList.add('active');document.getElementById('pairing-tab').style.display=t==='pairing'?'block':'none';document.getElementById('qr-tab').style.display=t==='qr'?'block':'none';}
async function startPair(){const n=document.getElementById('number').value.replace(/[^0-9]/g,'');if(!n||n.length<10)return alert('Enter valid number!');currentNumber=n;show('s2');document.getElementById('waitMsg').textContent='⏳ Generating...';const r=await fetch('/pair',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({number:n,type:'pairing'})});const d=await r.json();if(d.error){document.getElementById('waitMsg').textContent='❌ '+d.error;return;}if(d.sessionID){showSession(d.sessionID);return;}if(d.code){document.getElementById('codeDisplay').textContent=d.code.match(/.{1,4}/g)?.join('-')||d.code;document.getElementById('waitMsg').textContent='✅ Enter this code on WhatsApp!';startCheck();}}
async function startQR(){const r=await fetch('/pair',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'qr'})});const d=await r.json();if(d.qr){document.getElementById('qrDisplay').innerHTML='<img src="'+d.qr+'" alt="QR Code"><p style="color:#999;font-size:12px">Scan with WhatsApp</p>';currentNumber=d.number;startCheck();}}
function startCheck(){checkInterval=setInterval(async()=>{const r=await fetch('/check?number='+currentNumber);const d=await r.json();if(d.connected&&d.sessionID){clearInterval(checkInterval);showSession(d.sessionID);}},3000);}
function showSession(sid){show('s3');document.getElementById('sessionDisplay').textContent=sid;}
function copySession(){const t=document.getElementById('sessionDisplay').textContent;navigator.clipboard.writeText(t).then(()=>alert('✅ Copied!'));}
function show(id){document.querySelectorAll('.step').forEach(s=>{if(id==='s2'||id==='s3')s.classList.remove('active');});document.getElementById(id).classList.add('active');if(document.getElementById('s1'))document.getElementById('s1').classList.remove('active');}
</script>
</body></html>`);
});

// Pairing API
app.post('/pair', async (req, res) => {
    const { number, type } = req.body;
    
    if (type === 'qr') {
        const tempNum = 'qr_' + Date.now();
        const sessionDir = `./sessions/${tempNum}`;
        if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir, { recursive: true });
        
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
        const { version } = await fetchLatestBaileysVersion();
        
        const sock = makeWASocket({
            auth: state, version,
            browser: Browsers.ubuntu('Vampire MD'),
            logger: pino({ level: 'silent' }),
            printQRInTerminal: true
        });
        
        pairSessions[tempNum] = { sock, saveCreds, connected: false, sessionID: null };
        sock.ev.on('creds.update', saveCreds);
        
        sock.ev.on('connection.update', async (update) => {
            if (update.qr) {
                const qrUrl = await qrcode.toDataURL(update.qr);
                if (!pairSessions[tempNum].qrSent) {
                    pairSessions[tempNum].qrSent = true;
                    res.json({ qr: qrUrl, number: tempNum });
                }
            }
            if (update.connection === 'open') {
                const creds = JSON.parse(fs.readFileSync(`${sessionDir}/creds.json`, 'utf8'));
                const sessionID = 'VAMPIRE-MD:' + Buffer.from(JSON.stringify(creds)).toString('base64');
                pairSessions[tempNum].connected = true;
                pairSessions[tempNum].sessionID = sessionID;
                saveSession(tempNum, sessionID);
                
                // Send session to WhatsApp
                try {
                    await sock.sendMessage(sock.user.id, { text: `🧛 *Your Vampire MD Session ID*\n\n\`\`\`${sessionID}\`\`\`\n\n🚀 Deploy on Katabump/Panel with this!\n\n⚡ Vampire Tech` });
                } catch(e) {}
            }
        });
        return;
    }
    
    const cleanNumber = (number || '').replace(/[^0-9]/g, '');
    if (!cleanNumber || cleanNumber.length < 10) return res.json({ error: 'Invalid number' });
    
    const sessionDir = `./sessions/${cleanNumber}`;
    if (fs.existsSync(`${sessionDir}/creds.json`)) {
        try {
            const creds = JSON.parse(fs.readFileSync(`${sessionDir}/creds.json`, 'utf8'));
            const sessionID = 'VAMPIRE-MD:' + Buffer.from(JSON.stringify(creds)).toString('base64');
            return res.json({ sessionID });
        } catch(e) {}
    }
    
    if (!fs.existsSync(sessionDir)) fs.mkdirSync(sessionDir, { recursive: true });
    
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
    const { version } = await fetchLatestBaileysVersion();
    
    const sock = makeWASocket({
        auth: state, version,
        browser: Browsers.ubuntu('Vampire MD'),
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false
    });
    
    pairSessions[cleanNumber] = { sock, saveCreds, connected: false, sessionID: null };
    sock.ev.on('creds.update', saveCreds);
    
    sock.ev.on('connection.update', async (update) => {
        if (update.connection === 'open') {
            const creds = JSON.parse(fs.readFileSync(`${sessionDir}/creds.json`, 'utf8'));
            const sessionID = 'VAMPIRE-MD:' + Buffer.from(JSON.stringify(creds)).toString('base64');
            pairSessions[cleanNumber].connected = true;
            pairSessions[cleanNumber].sessionID = sessionID;
            saveSession(cleanNumber, sessionID);
            
            // Send session to their WhatsApp
            try {
                await sock.sendMessage(sock.user.id, { 
                    text: `🧛 *Your Vampire MD Session ID*\n\n\`\`\`${sessionID}\`\`\`\n\n📋 *How to deploy:*\n1. Go to Katabump/Panel\n2. Set SESSION_ID\n3. Deploy & run 24/7!\n\n👑 Owner: Paxton\n\n⚡ Vampire Tech` 
                });
            } catch(e) {}
        }
    });
    
    setTimeout(async () => {
        try {
            const code = await sock.requestPairingCode(cleanNumber);
            pairSessions[cleanNumber].code = code;
            console.log(`📱 Code for ${cleanNumber}: ${code}`);
            res.json({ code });
        } catch(e) {
            res.json({ error: e.message });
        }
    }, 2000);
});

function saveSession(number, sessionID) {
    const regFile = './sessions/sessions.json';
    let reg = {};
    if (fs.existsSync(regFile)) reg = JSON.parse(fs.readFileSync(regFile, 'utf8'));
    reg[number] = { sessionID, createdAt: new Date().toISOString() };
    fs.writeFileSync(regFile, JSON.stringify(reg, null, 2));
}

app.get('/check', (req, res) => {
    const { number } = req.query;
    const session = pairSessions[number];
    if (!session) return res.json({ connected: false });
    res.json({ connected: session.connected, sessionID: session.sessionID });
});

app.listen(PORT, () => {
    console.log(`\n🧛 Vampire MD Pairing Web: http://localhost:${PORT}\n`);
    console.log('✅ Pairing Code + QR Code available');
    console.log('📱 Session ID sent to user WhatsApp on connect\n');
});
