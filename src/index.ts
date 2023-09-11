import "dotenv/config";
import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import registerCommands from "./handlers/commands.handler";
import registerEvents from "./handlers/events.handler";

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

void Promise.all([registerCommands(client), registerEvents(client)]).then(
  () => {
    void client.login(process.env.DISCORD_TOKEN);
  },
);
