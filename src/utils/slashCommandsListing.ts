import {
  Collection,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandGroupBuilder,
} from "discord.js";
import {
  SlashCommand,
  SlashCommandSubcommand,
  SlashCommandSubcommandGroup,
} from "../types/utils";
import { handlerFileFilter, handlerRoot } from "../handler/on-start/constant";
import { importFiles } from "./filesImport";

export const generateSlashCommands = (slashCommands: SlashCommand[]) => {
  const generatedSlashCommands = new Collection<string, SlashCommandBuilder>();
  const commands = slashCommands.filter((sc) => sc?.type === "command");
  for (const command of commands) {
    const cmd = new SlashCommandBuilder()
      .setName(command.name)
      .setDescription(command.description);
    generatedSlashCommands.set(command.name, cmd);
  }
  const subcommandGroups = slashCommands.filter(
    (sc) => sc?.type === "subcommandGroup",
  );
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
      for (const subcommand of subcommands) {
        const { name, description, builder } =
          subcommand as SlashCommandSubcommand;
        const subCmd = new SlashCommandSubcommandBuilder()
          .setName(name)
          .setDescription(description);
        if (builder) builder(subCmd);
        subCmdGroup.addSubcommand(subCmd);
      }
      command.addSubcommandGroup(subCmdGroup);
    }
  }
  const subcommands = slashCommands.filter(
    (sc) => sc.type === "subcommand" && !sc.groupName,
  );
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
  return generatedSlashCommands;
};

interface ISlashCommand {
  name: string;
  builder: SlashCommandBuilder;
}

export const listSlashCommands = async (): Promise<ISlashCommand[]> => {
  const commands = await importFiles<SlashCommand>({
    options: {
      fileFilter: [handlerFileFilter],
    },
    path: `./${handlerRoot}/commands/slash`,
  });
  const generated = generateSlashCommands(commands.map(({ data }) => data));
  return generated.map((value, key) => ({ name: key, builder: value }));
};
