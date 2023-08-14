import { handlerFileFilter, handlerRoot } from "./constant";
import { Client } from "discord.js";
import { SlashCommand } from "../../types/utils";
import { importFiles } from "../../utils/filesImport";

const loadSlashCommands = async (client: Client) => {
  const commands = await importFiles<SlashCommand>({
    path: `./${handlerRoot}/commands/slash`,
    options: {
      fileFilter: [handlerFileFilter, "!*.type.ts", "!constant.ts"],
    },
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
  return Promise.all([loadSlashCommands(client)]);
}
