import "dotenv/config";
import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import registerBotEvents from "./handler/on-start/bot-events.handler";
import registerCommands from "./handler/on-start/commands.handler";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

client.slashCommands = new Collection();
client.prefixCommands = new Collection();

void Promise.all([registerCommands(client), registerBotEvents(client)]).then(
  () => {
    void client.login(process.env.DISCORD_TOKEN);
  },
);
