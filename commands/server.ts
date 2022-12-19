const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server."),
  async execute(interaction: Record<string, any>) {
    // interaction.guild is the object representing the Guild in which the command was run
    try {
      await interaction.reply(
        `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`
      );
    } catch (err) {
      console.error({ err, interaction, guild: interaction.guild });
    }
  },
};

export {};
