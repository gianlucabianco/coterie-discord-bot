/*
This interaction uses the Discord.js api to render modals.
The api includes methods to handle for form submission, it could be useful to handle users inputs.
(Ex. register user game results)
*/

/*

CODE EXAMPLE:

coterie.on("messageCreate", (message: Message) => {
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

	handleMessage(message)
})


coterie.on(Events.InteractionCreate, async (interaction: any) => {
	const modal = new ModalBuilder()
		.setCustomId("test-modal")
		.setTitle("Modal header")
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
	interaction?.showModal(modal)
	// if (interaction.isButton()) {
	// 	if (interaction.customId === "verification-button") {
	// 		const modal = new ModalBuilder()
	// 			.setCustomId("verification-modal")
	// 			.setTitle("Verify yourself")
	// 			.addComponents([
	// 				new ActionRowBuilder().addComponents(
	// 					(new TextInputBuilder() as any)
	// 						.setCustomId("verification-input")
	// 						.setLabel("Answer")
	// 						.setStyle(TextInputStyle.Short)
	// 						.setMinLength(4)
	// 						.setMaxLength(12)
	// 						.setPlaceholder("ABCDEF")
	// 						.setRequired(true)
	// 				) as any,
	// 			])

	// 		await interaction.showModal(modal)
	// 	}
	// }

	// if (interaction.type === InteractionType.ModalSubmit) {
	// 	if (interaction.customId === "verification-modal") {
	// 		const response = interaction.fields.getTextInputValue("verification-input")
	// 		interaction.reply(`Yay, your answer is submitted: "${response}"`)
	// 	}
	// }
})
*/
