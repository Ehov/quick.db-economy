const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const db = require("quick.db");

module.exports = {
  name: "portfel",
  aliases: ['wallet', 'kasa'],
  description: "Wyświetla stan konta x usera",
  usage: "p.portfel <@user>",
  run: async(client, message, args) => {
    let user = message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]) ||
    message.guild.members.cache.find(
      r =>
      r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
        ) ||
        message.member;
        
        let bal = db.fetch(`money_${user.id}`);
        if (bal === null) bal = 0;
        if (user) {
          
          const portfel = new MessageEmbed()
          .setColor("#00FF00")
          .setDescription(`${user} twój stan konta\n\n**DC**: \`${bal}\``);
          message.channel.send(portfel);
          
          } else {
            return message.channel.send("**wskaż usera!**");
          }
  }
}