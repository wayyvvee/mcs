const Discord = require("discord.js");
const b64image = require("base64-img");
const mcsrv = require("mcsrv");
const axios = require("axios");

exports.run = async (bot, message, args) => {
	let { online } = await mcsrv(args.join(""));
	if(online === true) {
	let date = new Date;
	let day = date.getDate();
	let hour = date.getHours();
	let minutes = date.getMinutes();
	axios.get(`${process.env.WEBURL}/index.php?server=${args.join("")}&voterID=${message.author.id}&time=${day}:${hour}:${minutes}`)
	.then((res) => {
		console.log(`statusCode: ${res.statusCode}`)
		console.log(res)
		if(res.data === "Success") {
			message.channel.send(new Discord.RichEmbed()
			.setTitle("Vote Added")
			.setDescription("Your vote has been counted.")
			.setFooter(args.join("")));
			return;
		} else if(res.data === "Cooldown") {
			message.channel.send(new Discord.RichEmbed()
			.setTitle("Cooldown")
			.setDescription("You may only vote once a day")
			.setFooter(args.join("")));
			return;
		} else {
			message.channel.send(new Discord.RichEmbed()
			.setTitle("Error")
			.setDescription(`Couldn't vote for ${args.join("")}.\nAre you sure its online?`)
			.setFooter(args.join("")));
			return;
		}
	})
	.catch((error) => {
		console.error(error)
	})
	} else {
	message.channel.send(new Discord.RichEmbed()
	.setTitle("Error")
	.setDescription(`Couldn't vote for ${args.join("")}.\nAre you sure its online?`)
	.setFooter(args.join("")));
	}
}