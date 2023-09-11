import type { Client } from "discord.js";
import { loadPrefixCommands } from "./prefixCommands.handler";
import { loadSlashCommands } from "./slashCommands.handler";

export default async function registerCommands(client: Client): Promise<void> {
  console.log("Loading commands...");
  await Promise.all([loadSlashCommands(client), loadPrefixCommands(client)]);
}
