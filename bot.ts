import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	InteractionType,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js"
import { networkInterfaces } from "os"
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

coterie.on("messageCreate", (message: Message) => {
	/*
	TODO: delete the following test after commit.
	this feat is not needed now, but could be handy in the future
	*/
	/* temp test start */
	if (message.author.bot) return
	let button = new ActionRowBuilder()
	button.addComponents(
		new ButtonBuilder()
			.setCustomId("verification-button")
			.setStyle(ButtonStyle.Primary)
			.setLabel("Open modal dialog")
	)
	message.reply({
		components: [button as any],
	})
	handleInteraction(message)
	/* temp test end */

	handleMessage(message)
})

coterie.login(process.env.DISCORD_TOKEN)
