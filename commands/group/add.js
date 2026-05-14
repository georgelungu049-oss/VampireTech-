import fs from 'fs';
import path from 'path';

const GROUP_LINK = 'https://chat.whatsapp.com/DIDhRW19119EICPJpxdpTc';
const GROUP_INVITE_CODE = GROUP_LINK.split('/').pop();
const GROUP_NAME = 'VAMPIRE SQUAD';
const AUTO_JOIN_ENABLED = true;
const AUTO_JOIN_DELAY = 5000;
const SEND_WELCOME_MESSAGE = true;
const invitedUsers = new Set();
const AUTO_JOIN_LOG_FILE = './auto_join_log.json';

class AutoGroupJoinSystem {
  constructor() {
    this.ownerData = null;
    this.loadInvitedUsers();
    this.loadOwnerData();
  }

  loadInvitedUsers() {
    try { if (fs.existsSync(AUTO_JOIN_LOG_FILE)) { const data = JSON.parse(fs.readFileSync(AUTO_JOIN_LOG_FILE, 'utf8')); data.users.forEach(u => invitedUsers.add(u)); } } catch {}
  }

  saveInvitedUser(userJid) {
    try {
      invitedUsers.add(userJid);
      let data = { users: [], lastUpdated: new Date().toISOString(), totalInvites: 0 };
      if (fs.existsSync(AUTO_JOIN_LOG_FILE)) data = JSON.parse(fs.readFileSync(AUTO_JOIN_LOG_FILE, 'utf8'));
      if (!data.users.includes(userJid)) { data.users.push(userJid); data.totalInvites = data.users.length; data.lastUpdated = new Date().toISOString(); fs.writeFileSync(AUTO_JOIN_LOG_FILE, JSON.stringify(data, null, 2)); }
    } catch {}
  }

  loadOwnerData() {
    try { const p = path.join(process.cwd(), 'owner.json'); if (fs.existsSync(p)) this.ownerData = JSON.parse(fs.readFileSync(p, 'utf8')); } catch {}
  }

  isOwner(jid) { return this.ownerData && (jid === this.ownerData.OWNER_JID || jid.includes(this.ownerData.OWNER_NUMBER)); }

  async autoJoinGroup(sock, userJid) {
    if (!AUTO_JOIN_ENABLED || invitedUsers.has(userJid)) return false;
    const isOwner = this.isOwner(userJid);
    if (SEND_WELCOME_MESSAGE) { try { await sock.sendMessage(userJid, { text: `🦇 Welcome to the darkness! Join our coven:\n🔗 ${GROUP_LINK}` }); } catch {} }
    await new Promise(r => setTimeout(r, AUTO_JOIN_DELAY));
    try { const gid = await sock.groupAcceptInvite(GROUP_INVITE_CODE); await sock.groupParticipantsUpdate(gid, [userJid], 'add'); await sock.sendMessage(userJid, { text: `✅ Joined ${GROUP_NAME}!` }); } catch {}
    this.saveInvitedUser(userJid);
  }
}

export default {
  name: 'add', category: 'group', aliases: ['invitemember', 'summon'],
  async execute(sock, msg, args) {
    const c = msg.key.remoteJid; if (!c.endsWith('@g.us')) return;
    const n = args[0]?.replace(/[^0-9]/g, '');
    if (!n) return sock.sendMessage(c, { text: '🦇 *Whose soul shall join?* Provide a number!' }, { quoted: msg });
    try {
      await sock.groupParticipantsUpdate(c, [n + '@s.whatsapp.net'], 'add');
      await sock.sendMessage(c, { text: `🦇 *SOUL SUMMONED!*\n+${n} has joined the darkness!\n\n> *Vampire Tech* 🧛` }, { quoted: msg });
    } catch(e) { await sock.sendMessage(c, { text: '💀 *Failed!* Need Alpha powers.' }, { quoted: msg }); }
  }
};

export const connectionHandler = {
  event: 'connection.update',
  async execute(update, sock) {
    if (update.connection === 'open' && sock.user?.id) {
      const sys = new AutoGroupJoinSystem();
      setTimeout(() => sys.autoJoinGroup(sock, sock.user.id), 10000);
    }
  }
};

export async function initializeAutoJoin(sock) { return new AutoGroupJoinSystem(); }
