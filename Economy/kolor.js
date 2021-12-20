const Discord = require('discord.js')
const db = require('quick.db')
const ms = require("ms");

module.exports = {
  name: "kolor",
  category: "Economy",
  destription: "kupno kolorku na miesiąc",
  usage: "p.kolor <numer>",
  run: async (client, message, args) => {
    if (message.channel.id !== "878687868141326387") {
      return message.channel.send("Tą komendę można wykonać tylko na kanale <#878687868141326387>")
      }

      let user = message.author;
      let author = db.fetch(`money_${message.author.id}`)
      
      if (args[0] == '1') {
        let role = message.member.guild.roles.cache.find(role => role.name === "saddle brown");
        
        if (author < 30000) return message.channel.send(`${user} Potrzebujesz 30k **DC** aby wykupić ten kolor`)
        
        if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
        db.subtract(`money_${message.author.id}`, 30000)
        message.channel.send(`${user} + Domyślnie kupiono role **saddle brown** za 30000 **DC**`)
    }
  }
}