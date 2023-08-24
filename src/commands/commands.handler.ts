import { Client } from "discord.js";
import { loadPrefixCommands } from "./prefix/prefixCommands.handler";
import { loadSlashCommands } from "./slash/slashCommands.handler";

export default function registerCommands(client: Client) {
  console.log("Loading commands...");
  return Promise.all([loadSlashCommands(client), loadPrefixCommands(client)]);
}
