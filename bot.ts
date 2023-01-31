import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"

import type { CommonObj, Message } from "./common.types"
import { handleInteraction } from "./interactions/interactions"
import { handleMessage } from "./messages/messages"

const { Client, Events, GatewayIntentBits } = require("discord.js")

require("dotenv").config()

const coterie = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
})

coterie.once(Events.ClientReady, (client: CommonObj) => {
	console.log(`Coterie is online! Logged in as ${client?.user?.tag}`)
})

coterie.on("messageCreate", (message: Message) => handleMessage(message))

coterie.login(process.env.DISCORD_TOKEN)
