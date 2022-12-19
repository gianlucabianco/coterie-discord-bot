const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

require("dotenv").config();

const coterie = new Client({ intents: [GatewayIntentBits.Guilds] });
coterie.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file: string) => file.endsWith(".ts"));

commandFiles.forEach((file: string) => {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  const couldSetCommand = !!command?.data?.name && !!command?.execute;

  if (!couldSetCommand) {
    return console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  coterie.commands.set(command.data.name, command);
});

coterie.once(Events.ClientReady, (c: Record<string, any>) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

coterie.login(process.env.DISCORD_TOKEN);

coterie.on(
  Events.InteractionCreate,
  async (interaction: Record<string, any>) => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction?.client?.commands?.get(interaction.commandName);

    if (!command) {
      return console.error(
        `No command matching ${interaction.commandName} was found.`
      );
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error({ error });
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
);
