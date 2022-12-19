const { REST, Routes } = require("discord.js");
const fs = require("node:fs");

require("dotenv").config();

const commands = [];

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".ts"));

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`)?.data?.toJSON();
  // @ts-ignore
  command && commands.push(command);
});

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

const deployCommands = async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.APPLICATION_ID,
        process.env.SERVER_ID
      ),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error({ error });
  }
};

deployCommands();
