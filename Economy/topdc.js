const { id } = require("common-tags");
const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "topdc",
  description: "Wyświetla top 10 userów z DC (DC=Dubu_Coins)",
  usage: "p.topka-dc",
  run: async(client, message, args) => {
    if (message.channel.id !== "864103900323774494") {
      return message.channel.send("Tą komendę można wykonać tylko na kanale <#864103900323774494>")
      }
      
      let money = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);
      if (!money.length) {
        let noEmbed = new MessageEmbed()
        .setAuthor(message.member.displayName, message.author.displayAvatarURL())
        .setColor("#FF0000")
        .setFooter("Nie ma nikogo")
        return message.channel.send(noEmbed)
        };
        
        money.length = 10;
        var finalLb = "";
        for (var i in money) {
          if (money[i].data === null) money[i].data = 0
          finalLb += `**${money.indexOf(money[i]) + 1}. ${client.users.cache.get(money[i].ID.split('_')[1]) ?
          client.users.cache.get(money[i].ID.split('_')[1]).tag : "Unknown User#0000"}** - \`${money[i].data}\` :dollar:\n`;
          };
          
          const embed = new MessageEmbed()
          .setTitle(`TOPKA DC ${message.guild.name}`)
          .setColor("#00FF00")
          .setDescription(finalLb)
          .setFooter(client.user.tag, client.user.displayAvatarURL())
          .setTimestamp()
          message.channel.send(embed);
  }
}