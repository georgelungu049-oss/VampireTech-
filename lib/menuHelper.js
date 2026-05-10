import fs from 'fs';

function getOwnerData() {
    try {
        if (fs.existsSync('./owner_info.json')) {
            return JSON.parse(fs.readFileSync('./owner_info.json', 'utf8'));
        }
    } catch (e) {}
    return {
        botName: 'Vampire MD',
        owner: { name: 'Paxton', saNumber: '27687813781' },
        coOwner: { name: 'Vamps', number: '263776699348' },
        footer: '⚡ Powered by Vampire Tech 🧛'
    };
}

export function getOwnerName() {
    return getOwnerData().owner.name;
}

export function getBotName() {
    return getOwnerData().botName;
}

export function getOwnerNumber() {
    return getOwnerData().owner.saNumber;
}

export function getCoOwnerName() {
    return getOwnerData().coOwner.name;
}

export function getCoOwnerNumber() {
    return getOwnerData().coOwner.number;
}

export function getBotFooter() {
    return getOwnerData().footer;
}

export function getChannelLink() {
    return getOwnerData().channel || 'https://whatsapp.com/channel/0029Vb7Smxe89inp918Glr1O';
}

export function getGroupLink() {
    return getOwnerData().group || 'https://chat.whatsapp.com/FjVOr9Ajf924tidBtB5Pgk';
}

export function getRuntime(prefix) {
    const uptime = process.uptime();
    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);
    const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
    return {
        prefix,
        uptime: `${h}h ${m}m ${s}s`,
        ram: `${ram} MB`,
        platform: 'Termux/Android',
        status: 'ONLINE'
    };
}
