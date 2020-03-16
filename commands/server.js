const Discord = require("discord.js");
const mcsrv = require("mcsrv");
const b64image = require("base64-img");
const axios = require("axios");

exports.run = async (bot, message, args) => {
	let { online } = await mcsrv(args.join(""));
	if(online === true){
		let { motd } = await mcsrv(args.join(""));
		let { version } = await mcsrv(args.join(""));
		let { icon } = await mcsrv(args.join(""));
		let { players } = await mcsrv(args.join(""));
		if(!icon) {
			icon = "data:image/png;base64,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";
		}
		b64image.img(icon, "./images", `${args.join("")}`, function(err, filepath) {});
		let filepath = b64image.imgSync(icon, "./images", `${args.join("")}`);
		let attchmnt = new Discord.Attachment(`./images/${args.join("")}.png`, 'image.png');

		online = "Yes";
		axios.get(`${process.env.WEBURL}/getInfo.php?server=${args.join("")}`)
		.then((res) => {
			//console.log(`statusCode: ${res.statusCode}`)
			//console.log(res)
			if(!res.data) {
				message.channel.send(new Discord.RichEmbed()
				.setTitle("Error")
				.setDescription("Something went wrong...")
				.setFooter(args.join("")));
				return;
			} else {
				message.channel.send(new Discord.RichEmbed()
				.attachFile(attchmnt)
				.setTitle('A Minecraft Server')
				.setThumbnail("attachment://image.png")
				.setDescription(`Players: ${players.online}/${players.max}\nVersion: ${version}\nMotd: ${motd.clean.join("\n")}\nVotes: ${res.data}`)
				.setFooter(args.join("")));
			}
		});
	} else {
		online = "No";
		message.channel.send(new Discord.RichEmbed()
		.setTitle("Server Information")
		.setDescription(`Online: ${online}`)
		.setFooter(args.join("")));
	}
}
