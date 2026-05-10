import { getBotName, getOwnerName, getBotFooter, getRuntime } from './menuHelper.js';

export function getBotName() {
    return getBotName();
}

export function getFullBotInfo(prefix) {
    const runtime = getRuntime(prefix);
    return {
        name: 'Vampire MD',
        version: '1.0.0',
        owner: 'Paxton',
        coOwner: 'Vamps',
        saNumber: '+27687813781',
        zwNumber: '+263776699348',
        email: 'georgelungu049@gmail.com',
        prefix: runtime.prefix,
        uptime: runtime.uptime,
        ram: runtime.ram,
        platform: runtime.platform,
        status: runtime.status,
        channel: 'https://whatsapp.com/channel/0029Vb7Smxe89inp918Glr1O',
        group: 'https://chat.whatsapp.com/FjVOr9Ajf924tidBtB5Pgk',
        footer: '⚡ Powered by Vampire Tech 🧛'
    };
}
