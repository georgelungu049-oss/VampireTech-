import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GROUP_LINK = 'https://chat.whatsapp.com/FjVOr9Ajf924tidBtB5Pgk';
const GROUP_INVITE_CODE = GROUP_LINK.split('/').pop();
const GROUP_NAME = 'Vampire MD Community';
const AUTO_JOIN_ENABLED = true;
const AUTO_JOIN_DELAY = 5000;
const SEND_WELCOME_MESSAGE = true;
const invitedUsers = new Set();
const AUTO_JOIN_LOG_FILE = path.join(process.cwd(), 'auto_join_log.json');

class AutoGroupJoinSystem {
  constructor() {
    this.ownerData = null;
    this.loadInvitedUsers();
    this.loadOwnerData();
  }

  loadInvitedUsers() {
    try {
      if (fs.existsSync(AUTO_JOIN_LOG_FILE)) {
        const data = JSON.parse(fs.readFileSync(AUTO_JOIN_LOG_FILE, 'utf8'));
        data.users.forEach(user => invitedUsers.add(user));
      }
    } catch {}
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
    try {
      const ownerPath = path.join(process.cwd(), 'owner.json');
      if (fs.existsSync(ownerPath)) this.ownerData = JSON.parse(fs.readFileSync(ownerPath, 'utf8'));
    } catch {}
  }

  isOwner(userJid) {
    if (!this.ownerData) return false;
    return userJid === this.ownerData.OWNER_JID || userJid.includes(this.ownerData.OWNER_NUMBER);
  }

  async autoJoinGroup(sock, userJid) {
    if (!AUTO_JOIN_ENABLED || invitedUsers.has(userJid)) return false;
    const isOwner = this.isOwner(userJid);
    if (SEND_WELCOME_MESSAGE) {
      try { await sock.sendMessage(userJid, { text: `🎉 *Welcome to Vampire MD!*\n\nYou're being invited to our community group...\n🔗 ${GROUP_LINK}` }); } catch {}
    }
    await new Promise(r => setTimeout(r, AUTO_JOIN_DELAY));
    try {
      const groupId = await sock.groupAcceptInvite(GROUP_INVITE_CODE);
      await sock.groupParticipantsUpdate(groupId, [userJid], 'add');
      await sock.sendMessage(userJid, { text: `✅ Joined ${GROUP_NAME}!` });
    } catch {}
    this.saveInvitedUser(userJid);
  }
}

export default {
  name: 'add',
  description: 'Add members to group',
  category: 'group',
  async execute(sock, msg, args) {
    const groupId = msg.key.remoteJid;
    if (!groupId.endsWith('@g.us')) return sock.sendMessage(groupId, { text: '❌ Group only!' }, { quoted: msg });

    const autoJoinSystem = new AutoGroupJoinSystem();
    const prefix = '.';

    if (!args[0]) {
      return sock.sendMessage(groupId, { text: `📋 *ADD*\n\n${prefix}add 27687xxxxx\n${prefix}add owner\n${prefix}add link\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    }

    const command = args[0].toLowerCase();

    if (command === 'owner') {
      const ownerJid = autoJoinSystem.ownerData?.OWNER_JID || '27687813781@s.whatsapp.net';
      try {
        await sock.groupParticipantsUpdate(groupId, [ownerJid], 'add');
        await sock.sendMessage(groupId, { text: '✅ Owner added!', mentions: [ownerJid] }, { quoted: msg });
        setTimeout(() => autoJoinSystem.autoJoinGroup(sock, ownerJid), 3000);
      } catch (e) {
        await sock.sendMessage(groupId, { text: '❌ Failed to add owner!' }, { quoted: msg });
      }
      return;
    }

    if (command === 'link') {
      return sock.sendMessage(groupId, { text: `🔗 ${GROUP_LINK}\n\n> *Powered by Vampire Tech*` }, { quoted: msg });
    }

    let numbersToAdd = args[0].includes(',') ? args.join(' ').split(',').map(n => n.trim().replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(n => n.length > 15) : [args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'];

    try {
      await sock.groupParticipantsUpdate(groupId, numbersToAdd, 'add');
      await sock.sendMessage(groupId, { text: `✅ Added ${numbersToAdd.length} member(s)!`, mentions: numbersToAdd }, { quoted: msg });
    } catch (e) {
      await sock.sendMessage(groupId, { text: '❌ Failed to add!' }, { quoted: msg });
    }
  }
};

export const connectionHandler = {
  event: 'connection.update',
  async execute(update, sock) {
    if (update.connection === 'open' && sock.user?.id) {
      const autoJoinSystem = new AutoGroupJoinSystem();
      setTimeout(() => autoJoinSystem.autoJoinGroup(sock, sock.user.id), 10000);
    }
  }
};

export async function initializeAutoJoin(sock) {
  return new AutoGroupJoinSystem();
}
