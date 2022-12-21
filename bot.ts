import type { CommonObj } from "./common.types"
import { handleMessage } from "./messages/messages"

const { Client, Events, GatewayIntentBits } = require("discord.js")

require("dotenv").config()

const coterie = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})

coterie.once(Events.ClientReady, (client: CommonObj) => {
	console.log(`Coterie is online! Logged in as ${client?.user?.tag}`)
	const list = client?.guilds?.cache?.get(process.env.SERVER_ID)
	list.members.cache.forEach((member: any) => console.log(member.user.username))
})

coterie.on("messageCreate", (message: CommonObj) => handleMessage(message))

coterie.login(process.env.DISCORD_TOKEN)
