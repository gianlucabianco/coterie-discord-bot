const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hi")
    .setDescription("Replies with Bella!"),
  async execute(interaction) {
    console.log({ interaction });
    try {
      await interaction.reply("Bella!");
    } catch (err) {
      console.error({ err, interaction });
    }
  },
};
