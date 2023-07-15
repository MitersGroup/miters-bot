import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (onReadyClient) => {
  console.log(`Ready! Logged in as ${onReadyClient.user.tag}`);
});

void client.login(process.env.DISCORD_TOKEN);
