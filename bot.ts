import { handleMessage } from "./messages/messages";

const { Client, Events, GatewayIntentBits } = require("discord.js");

require("dotenv").config();

const coterie = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

coterie.once(Events.ClientReady, (client: Record<string, any>) => {
  console.log(`Coterie is online! Logged in as ${client?.user?.tag}`);
});

coterie.on("messageCreate", (message: Record<string, any>) =>
  handleMessage(message)
);

coterie.login(process.env.DISCORD_TOKEN);
