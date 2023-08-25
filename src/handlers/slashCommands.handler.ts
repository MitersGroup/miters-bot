import {
  ChatInputCommandInteraction,
  Client,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import { importFiles } from "../utils/filesImport";

interface SlashCommandBase {
  name: string;
  description: string;
  execute: (
    client: Client,
    interaction: ChatInputCommandInteraction,
  ) => Promise<void>;
}

export interface SlashCommandRoot extends SlashCommandBase {
  type: "command";
  builder?: (
    command: SlashCommandBuilder,
  ) => Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
}

export interface SlashCommandSubcommand extends SlashCommandBase {
  type: "subcommand";
  groupName?: string;
  commandName: string;
  builder?: (
    subcommand: SlashCommandSubcommandBuilder,
  ) => SlashCommandSubcommandBuilder;
}

export interface SlashCommandSubcommandGroup extends SlashCommandBase {
  type: "subcommandGroup";
  commandName: string;
}

export type SlashCommand =
  | SlashCommandRoot
  | SlashCommandSubcommand
  | SlashCommandSubcommandGroup;

export const loadSlashCommands = async (client: Client) => {
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
