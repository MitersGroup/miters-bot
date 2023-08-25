import { Client } from "discord.js";
import { loadPrefixCommands } from "./prefixCommands.handler";
import { loadSlashCommands } from "./slashCommands.handler";

export default function registerCommands(client: Client) {
  console.log("Loading commands...");
  return Promise.all([loadSlashCommands(client), loadPrefixCommands(client)]);
}
