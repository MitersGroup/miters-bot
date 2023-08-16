import { PrefixCommand, SlashCommand } from "../../types/utils";
import { Client } from "discord.js";
import { importFiles } from "../../utils/filesImport";

const loadPrefixCommands = async (client: Client) => {
  const commands = await importFiles<PrefixCommand>({
    path: `commands/prefix`,
  });
  console.log(`Loaded (${commands.length}) prefix commands`);
  commands.forEach(({ data }) => {
    if (!data.name) return;
    client.prefixCommands.set(data.name, data);
  });
};
const loadSlashCommands = async (client: Client) => {
  const commands = await importFiles<SlashCommand>({
    path: `commands/slash`,
  });
  console.log(`Loaded (${commands.length}) slash commands`);
  commands.forEach(({ data }) => {
    if (!data.name) return;
    const commandName: string[] = [];
    if (data.type === "command") {
      commandName.push(data.name);
    } else if (data.type === "subcommand") {
      commandName.push(data.commandName);
      if (data.groupName) commandName.push(data.groupName);
      commandName.push(data.name);
    }
    client.slashCommands.set(commandName.join(" "), data);
  });
};

export default function registerCommands(client: Client) {
  return Promise.all([loadSlashCommands(client), loadPrefixCommands(client)]);
}
