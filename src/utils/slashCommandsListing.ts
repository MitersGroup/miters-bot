import {
  Collection,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
} from "discord.js";
import type {
  SlashCommand,
  SlashCommandRoot,
  SlashCommandSubcommand,
  SlashCommandSubcommandGroup,
} from "../handlers/slashCommands.handler";
import { importFiles } from "./filesImport";

const processCommands = (
  commands: SlashCommandRoot[],
  generatedSlashCommands: Collection<string, SlashCommandBuilder>,
): void => {
  for (const command of commands) {
    const cmd = new SlashCommandBuilder()
      .setName(command.name)
      .setDescription(command.description);
    if (command.builder) command.builder(cmd);
    generatedSlashCommands.set(command.name, cmd);
  }
};

const processSubcommands = (
  subcommands: SlashCommand[],
  generatedSlashCommands: Collection<string, SlashCommandBuilder>,
): void => {
  for (const subcommand of subcommands) {
    const { commandName, name, description, builder } =
      subcommand as SlashCommandSubcommand;
    const command = generatedSlashCommands.get(commandName);
    if (command) {
      const subCmd = new SlashCommandSubcommandBuilder()
        .setName(name)
        .setDescription(description);
      if (builder) builder(subCmd);
      command.addSubcommand(subCmd);
    }
  }
};

const processSubcommandGroups = (
  subcommandGroups: SlashCommand[],
  slashCommands: SlashCommand[],
  generatedSlashCommands: Collection<string, SlashCommandBuilder>,
): void => {
  for (const subcommandGroup of subcommandGroups) {
    const { commandName, name: subcommandGroupName } =
      subcommandGroup as SlashCommandSubcommandGroup;
    const subcommands = slashCommands.filter(
      (sc) =>
        sc.type === "subcommand" &&
        sc.groupName === subcommandGroupName &&
        sc.commandName === commandName,
    );
    const command = generatedSlashCommands.get(commandName);
    if (command) {
      const subCmdGroup = new SlashCommandSubcommandGroupBuilder()
        .setName(subcommandGroupName)
        .setDescription(subcommandGroup.description);
      subcommands.forEach((subcommand) => {
        const { name, description, builder } =
          subcommand as SlashCommandSubcommand;
        const subCmd = new SlashCommandSubcommandBuilder()
          .setName(name)
          .setDescription(description);
        if (builder) builder(subCmd);
        subCmdGroup.addSubcommand(subCmd);
      });
      command.addSubcommandGroup(subCmdGroup);
    }
  }
};

export const generateSlashCommands = (
  slashCommands: SlashCommand[],
): Collection<string, SlashCommandBuilder> => {
  const generatedSlashCommands = new Collection<string, SlashCommandBuilder>();
  const commands = slashCommands.filter(
    (sc) => sc.type === "command",
  ) as SlashCommandRoot[];

  processCommands(commands, generatedSlashCommands);
  const subcommandGroups = slashCommands.filter(
    (sc) => sc.type === "subcommandGroup",
  );

  processSubcommandGroups(
    subcommandGroups,
    slashCommands,
    generatedSlashCommands,
  );
  const subcommands = slashCommands.filter(
    (sc) => sc.type === "subcommand" && typeof sc.groupName !== "undefined",
  );

  processSubcommands(subcommands, generatedSlashCommands);
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
