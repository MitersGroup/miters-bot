import {
  Collection,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from "discord.js";
import type { SlashCommand } from "../handlers/slashCommands.handler";
import { importFiles } from "./filesImport";

export const generateSlashCommands = (
  slashCommands: SlashCommand[],
): Collection<string, SlashCommandBuilder> => {
  const generatedSlashCommands = new Collection<string, SlashCommandBuilder>();

  for (const command of slashCommands) {
    const builder = new SlashCommandBuilder()
      .setName(command.name)
      .setDescription(command.description);
    const { options = [] } = command;
    options.forEach(({ name, description, required }) => {
      builder.addStringOption(
        new SlashCommandStringOption()
          .setName(name)
          .setDescription(description)
          .setRequired(required),
      );
    });
    generatedSlashCommands.set(command.name, builder);
  }

  return generatedSlashCommands;
};

interface ISlashCommand {
  name: string;
  builder: SlashCommandBuilder;
}

export const listSlashCommands = async (): Promise<ISlashCommand[]> => {
  const commands = await importFiles<SlashCommand>({
    path: `commands/slash`,
  });
  const generated = generateSlashCommands(commands.map(({ data }) => data));
  return generated.map((value, key) => ({ name: key, builder: value }));
};
