const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const ms = require("ms");

module.exports = {
    name: "hourly",
    aliases: ['godzinna', 'dajnozedwazłote'],
    description: "godzinna nagroda (5)",
    usage: "p.hourly",
    run: async(client, message, args) => {
      if (message.channel.id !== "864103900323774494") {
        return message.channel.send("Tą komendę można wykonać tylko na kanale <#864103900323774494>")
        }
        
        let user = message.author;
        let timeout = 86400000;
        let amount = 5;
        
        let hourly = await db.fetch(`hourly_${user.id}`);
        
        if (hourly !== null && timeout - (Date.now() - hourly) > 0) {
          let time = ms(timeout - (Date.now() - hourly));
          
          const timeEmbed = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription(`Odebrałeś już grosiaki ! Następne drobne za **${time}**`);
          message.channel.send(timeEmbed);
          
          } else {
            
            const moneyEmbed = new MessageEmbed()
            .setColor("#00FF00")
            .setDescription(`Łap godzinną nagrodę! \`${amount}\` **DC**`);
            message.channel.send(moneyEmbed);
            db.add(`money_${user.id}`, amount);
            db.set(`hourly_${user.id}`, Date.now());
          }
    }
}