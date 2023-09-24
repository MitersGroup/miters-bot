import type { ChatInputCommandInteraction, Client } from "discord.js";
import { importFiles } from "../utils/filesImport";

interface SlashCommandOption {
  name: string;
  description: string;
  required: boolean;
}

export interface SlashCommand {
  name: string;
  description: string;
  options?: SlashCommandOption[];
  execute: (
    client: Client,
    interaction: ChatInputCommandInteraction,
  ) => Promise<void>;
}

export const loadSlashCommands = async (client: Client): Promise<void> => {
  const commands = await importFiles<SlashCommand>({
    path: `commands/slash`,
  });
  console.log(`Loaded (${commands.length}) slash commands`);
  commands.forEach(({ data }) => {
    if (client.slashCommands.has(data.name)) {
      console.error(`Slash command "${data.name}" already exists!`);
      return;
    }
    client.slashCommands.set(data.name, data);
  });
};
