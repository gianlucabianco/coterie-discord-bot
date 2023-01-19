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

// FIXME: interaction is also write a simple message with a command
coterie.on(Events.InteractionCreate, async (interaction: any) => {
	if (interaction.isButton()) {
		if (interaction.customId === "verification-button") {
			const modal = new ModalBuilder()
				.setCustomId("verification-modal")
				.setTitle("Verify yourself")
				.addComponents([
					new ActionRowBuilder().addComponents(
						(new TextInputBuilder() as any)
							.setCustomId("verification-input")
							.setLabel("Answer")
							.setStyle(TextInputStyle.Short)
							.setMinLength(4)
							.setMaxLength(12)
							.setPlaceholder("ABCDEF")
							.setRequired(true)
					) as any,
				])

			await interaction.showModal(modal)
		}
	}

	if (interaction.type === InteractionType.ModalSubmit) {
		if (interaction.customId === "verification-modal") {
			const response = interaction.fields.getTextInputValue("verification-input")
			interaction.reply(`Yay, your answer is submitted: "${response}"`)
		}
	}
})

coterie.login(process.env.DISCORD_TOKEN)
