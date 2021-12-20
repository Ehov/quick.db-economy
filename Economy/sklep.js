const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "sklep",
    category: "Economy",
    destription: "sklepik z rolami",
    usage: "p.sklep",
    run: async(client, message, args) => {
      let sklep = new MessageEmbed()
      .setColor("#B61F6A") 
      .setTitle(`**Oto nasz serverowy sklepik z rolami!**`)
      .setDescription(`Aby kupić kolor należy wprowadzić następującą komendę:\n**p.kolor <numer>**\nKażdy kolor kosztuje 30 000 **DC**\nCzas trwania roli tylko **miesiąc**\nhttps://i.imgur.com/5vx7JPF.png`)
      .setImage("https://i.imgur.com/5vx7JPF.png")
      .setFooter(message.guild.name, message.guild.iconURL())
      message.channel.send(sklep)
    }
}