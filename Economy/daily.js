const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const ms = require("ms");

module.exports = {
    name: "daily",
    aliases: ['dzienna', 'drobne'],
    description: "Dzienna nagroda (100)",
    usage: "p.daily",
    run: async(client, message, args) => {
      if (message.channel.id !== "864103900323774494") {
        return message.channel.send("Tą komendę można wykonać tylko na kanale <#864103900323774494>")
        }
        
        let user = message.author;
        let timeout = 86400000;
        let amount = 100;
        
        let daily = await db.fetch(`daily_${user.id}`);
        
        if (daily !== null && timeout - (Date.now() - daily) > 0) {
          let time = ms(timeout - (Date.now() - daily));
          
          const timeEmbed = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription(`Odebrałeś już dzienną nagrodę! Następne drobne za **${time}**`);
          message.channel.send(timeEmbed);
          
          } else {
            
            const moneyEmbed = new MessageEmbed()
            .setColor("#00FF00")
            .setDescription(`Łap dzienną nagrodę! \`${amount}\` **DC**`);
            message.channel.send(moneyEmbed);
            db.add(`money_${user.id}`, amount);
            db.set(`daily_${user.id}`, Date.now());
          }
    }
}