
//funkcja.js

module.exports = {
randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
}

//JSON/Rybki.json
{
	"common": {
		"symbol": "🤍Common - 🥾",
		"max": 30,
		"min": 10
	},
	"uncommon": {
		"symbol": "🤎Uncommon - 🦎",
		"max": 70,
		"min": 30
	},
	"rare": {
		"symbol": "💙Rare - 🐟",
		"max": 90,
		"min": 50
	},
	"unique": {
		"symbol": "💚Unique - 🐠",
		"max": 175,
		"min": 130
	},
    "chronicle": {
        "symbol": "💛Chronicle - 🦐", 
        "max": 500,
        "min": 160
    },
    "legendary": {
        "symbol": "🧡Legendary - 🦞",
        "max": 700,
        "min": 200
    },
    "mythic": {
        "symbol": "❤Mythiv - ❗ 🐉 ❗"
        "max": 1200,
        "min": 400
    }
}

const fishes = require('../../JSON/fishes.json');
const { randomRange } = require('../../functions');
const { MessageEmbed } = require('discord.js');
const ms = require("parse-ms");
let db = require('quick.db');

module.exports = {
        name: 'wedka',
        category: 'Economy',
        description: 'Łapanie rybek z oceanu',
        usage: 'p.wedka',
        run: async (client, message, args) => {
            let user = message.author;
            let bal = db.fetch(`money_${user.id}`)
            let fish = await db.fetch(`fish_${user.id}`)
            
            if (!args[0]) {
            if (bal === null) bal = 0;

            if (fish == null) fish = 0;
            const fishID = Math.floor(Math.random() * 10) + 1;
            let rarity;

            if (fishID < 5) rarity = 'common';
            else if (fishID < 6) rarity = 'uncommon';
            else if (fishID < 7) rarity = 'rare';
            else if (fishID < 8) rarity = 'unique';
            else if (fishID < 9) rarity = 'chronicle';
            else if (fishID < 10) rarity = 'legendary';
            else rarity = 'mythic';

            const fishh = fishes[rarity];
            const amount = randomRange(fishh.min, fishh.max);

            let timeout = 1800000;
            let fishtime = await db.fetch(`fishtime_${user.id}`);

            if (fishtime !== null && timeout - (Date.now() - fishtime) > 0) {
                let time = ms(timeout - (Date.now() - fishtime));

                const timeEmbed = new MessageEmbed()
                    .setColor("#FF0000")
                    .setDescription(`${user} Ryba nie bierze, spróbuj ponownie za ${time}`);
                return message.channel.send(timeEmbed)
            }

            const embed = new MessageEmbed()
                .setColor("#00FF00")
                .setDescription(`**Wędkarstwo:** - 🎣\n${user} złowił ${fishh.symbol} wartą: \`${amount}\``)
            message.channel.send(embed);

            db.add(`money_${user.id}`, amount);
            db.add(`fish_${user.id}`, 1);
            db.set(`fishtime_${user.id}`, Date.now())
        }
        if (args[0] === 'rewards') {

            let lEmbed = new MessageEmbed()
                .setColor("#00FF00")
                .setTitle(`Lista rzadkości ryb i ich wartość MIN - MAX`)
                .setDescription(`
\`\`\`🔧Junk      :: Max Reward: 5, Min Reward: 1
🐟Common    :: Max Reward: 25, Min Reward: 10
🐠Uncommon  :: Max Reward: 50, Min Reward: 18
🦑Rare      :: Max Reward: 75, Min Reward: 30
🐋Legendary :: Max Reward: 100, Min Reward: 50\`\`\`
**All reward are random from max/min**
​
`)
                .setFooter(message.guild.name, message.guild.iconURL())
            return message.channel.send(lEmbed);
        }
    }
}
        }