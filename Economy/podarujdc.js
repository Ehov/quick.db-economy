const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "podarujdc",
  category: "Economy",
  description: "Przekaż kwote",
  usage: "p.podarujdc <nick> <kwota>",
  run: async (client, message, args) => {
    if (message.channel.id !== "864103900323774494") {
      return message.channel.send("Tą komendę można wykonać tylko na kanale <#864103900323774494>") 
      }
      try {
        
        let user2 = message.author
        if (!args[0]) return message.channel.send("Poprawne użycie:\n`p.podarujdc` `<@user>` `<amount>`");
        let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) ||
        message.guild.members.cache.find(r => r.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );
        if (!user) return message.channel.send("Poprawne użycie:\n`p.podarujdc` `<@user>` `<amount>`");
        
        let member = db.fetch(`DC_${message.guild.id}_${user2.id}`);
        const embed1 = new MessageEmbed()
        .setColor("#FF0000")
        .setDescription("Poprawne użycie:\n`p.podarujdc` `<@user>` `<amount>`");
        if (!args[0]) {
          return message.channel.send(embed1);
          }
          const embed2 = new MessageEmbed()
          .setColor("#FF0000")
          .setDescription(`${user} Sobie nie podarujesz kasy`);
          if (user.user.id === message.author.id) {
            return message.channel.send(embed2);
            }
            const embed3 = new MessageEmbed()
            .setColor("#FF0000")
            .setDescription("Poprawne użycie:\n`p.podarujdc` `<@user>` `<amount>`");
            if (!args[1]) {
              return message.channel.send(embed3);
              }
              const embed4 = new MessageEmbed()
              .setColor("#FF0000")
              .setDescription("Poprawne użycie:\n`p.podarujdc` `<@user>` `<amount>`");
              if (isNaN(args[1])) {
                return message.channel.send(embed4);
                }
                const embed5 = new MessageEmbed()
                .setColor("#FF0000")
                .setDescription(`${user} nie posiadasz tyle **DC**`);
                
                if (member < args[1]) {
                  return message.channel.send(embed5);
                  }
                  const embed6 = new MessageEmbed()
                  .setColor("#00FF00")
                  .setDescription(`✅ Podarowałeś ${user} ${args[1]} **DC**`);
                  message.channel.send(embed6);
                  db.add(`DC_${message.guild.id}_${user.id}`, args[1]);
                  db.subtract(`DC_${message.guild.id}_${user2.id}`, args[1]);
                  } catch {
                  }
  }
}