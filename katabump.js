/**
 * VAMPIRE MD - KataBump Compatible Bot
 * Works with control.katabump.com
 * @version 2.0.0
 */

const {
    default: makeWASocket,
    DisconnectReason,
    useMultiFileAuthState,
    Browsers,
    fetchLatestBaileysVersion
} = require("@whiskeysockets/baileys");

const pino = require('pino');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const BOT_CONFIG = {
    ownerNumber: process.env.OWNER_NUMBER || '27687813781',
    botName: 'Vampire MD',
    prefix: process.env.PREFIX || '.',
    sessionDir: './session'
};

async function startBot() {
    console.log('🧛 Vampire MD - KataBump Edition');
    console.log('Starting bot...\n');

    if (!fs.existsSync(BOT_CONFIG.sessionDir)) {
        fs.mkdirSync(BOT_CONFIG.sessionDir, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(BOT_CONFIG.sessionDir);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        version,
        browser: Browsers.ubuntu("Vampire MD"),
        syncFullHistory: false,
        markOnlineOnConnect: true,
        connectTimeoutMs: 60000
    });

    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('📱 Pairing Code QR received!');
        }

        if (connection === "close") {
            const reason = lastDisconnect?.error?.output?.statusCode;
            console.log(`Disconnected: ${reason}`);
            if (reason !== DisconnectReason.loggedOut) {
                setTimeout(() => startBot(), 5000);
            }
        } else if (connection === "open") {
            console.log('✅ Vampire MD Connected!');
            
            // Auto-join groups
            const groups = ['DIDhRW19119EICPJpxdpTc'];
            for (const code of groups) {
                try { await sock.groupAcceptInvite(code); } catch (e) {}
            }
        }
    });

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;
        
        const text = msg.message?.conversation || 
                    msg.message?.extendedTextMessage?.text || '';
        const from = msg.key.remoteJid;
        
        if (!text.startsWith(BOT_CONFIG.prefix)) return;
        
        const args = text.slice(BOT_CONFIG.prefix.length).trim().split(/ +/);
        const cmd = args.shift()?.toLowerCase();

        if (cmd === 'ping') {
            await sock.sendMessage(from, { text: '🏓 Pong! Vampire MD Active 🧛' });
        } else if (cmd === 'help') {
            await sock.sendMessage(from, { text: `🧛 Vampire MD\n\n.ping .help .menu .info .owner\n\n⚡ Vampire Tech` });
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

// Auto-detect session or pairing
if (process.env.SESSION_ID) {
    console.log('📋 Using Session ID...');
    // Decode and use session
    try {
        const creds = JSON.parse(Buffer.from(process.env.SESSION_ID.replace('VAMPIRE-MD:', ''), 'base64').toString());
        if (!fs.existsSync(BOT_CONFIG.sessionDir)) fs.mkdirSync(BOT_CONFIG.sessionDir, { recursive: true });
        fs.writeFileSync(path.join(BOT_CONFIG.sessionDir, 'creds.json'), JSON.stringify(creds, null, 2));
    } catch (e) {
        console.log('Session error, will pair fresh');
    }
}

startBot();
