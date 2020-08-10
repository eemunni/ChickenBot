const Discord = require("discord.js");
module.exports = async (client, messageDelete) => {
    if(!messageDelete.guild) return;
    const embed = new Discord.MessageEmbed()
    .setDescription(`**Message Deleted**\n**User:** ${messageDelete.author.tag}\n**Channel:** ${messageDelete.channel.toString()} \`#${messageDelete.channel.name}\`\n\n**Message:**\n${messageDelete.content}`)
    .setColor("ff0000")
    .setTimestamp()
    if (messageDelete.attachments.size != 0) {
        embed.addField("Attachments", messageDelete.attachments.map(v=>`[${v.name}](${v.proxyURL})`).join(" "))
    }
    client.channels.cache.get(client.config.log).send(embed)
    let log = client.db.get(messageDelete.guild.id).settings.log;
    if(log){
      client.channels.cache.get(log).send(embed)
    }
}