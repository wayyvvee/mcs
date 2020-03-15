const Discord = require("discord.js");
const b64image = require("base64-img");
const http = require("http");
const bot = new Discord.Client();
const pfx = "s;";
bot.on("ready", () => {
console.log("Running");
bot.user.setActivity("Minecraft");
bot.channels.get('564951236487675914').send(`MCStats has been restarted`);
});

bot.on("message", async message => {
let msg = message.content.toLowerCase();
let user = message.author;
let args = message.content.slice(pfx.length).trim().split(' ');
let cmd = args.shift().toLowerCase();
if(!msg.startsWith(pfx)) return;
if(user.bot) return;
try{
let commandFile = require(`./commands/${cmd}.js`);
commandFile.run(bot, message, args);
} catch(e) {
bot.channels.get('565011678203215892').send(new Discord.RichEmbed()
.setTitle(`Server: ${message.guild.name}`)
.setAuthor(message.author.tag)                                    
.setDescription(e.message)
.setColor([255, 0, 0]));
if(message.guild.id == '264445053596991498') return; 
 let err = new Discord.RichEmbed()
.setTitle('Error')
.setDescription('```' + e.message + '```')
.setColor([255, 0, 0]);
message.channel.send({embed: err});                                        
}
});

bot.login(process.env.TOKEN);