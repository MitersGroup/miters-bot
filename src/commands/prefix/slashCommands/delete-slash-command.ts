import { Client, Guild, Message } from "discord.js";
import { PrefixCommand } from "../../../types/utils";
import djsRestHelper from "../../../utils/discordjs/slashCommands";

interface IDeleteGlobalSlashCommands {
  commandsToDelete: string[];
  client: Client<true>;
  sentMessage: Message;
}

const deleteGlobalSlashCommands = async ({
  commandsToDelete,
  client,
  sentMessage,
}: IDeleteGlobalSlashCommands) => {
  const registeredGlobalSlashCommands =
    await djsRestHelper.slashCommand.global.getAll({ client });

  await Promise.all(
    commandsToDelete.map(async (commandName) => {
      const globalCommand = registeredGlobalSlashCommands.find(
        (gsc) => gsc.name === commandName,
      );
      if (globalCommand)
        await djsRestHelper.slashCommand.global.deleteOne({
          client,
          commandId: globalCommand.id,
        });
    }),
  );
  await sentMessage.edit({
    content: "Done!",
  });
};

interface IDeleteGuildSlashCommands {
  commandsToDelete: string[];
  client: Client<true>;
  sentMessage: Message;
  guild: Guild;
}

const deleteGuildSlashCommands = async ({
  commandsToDelete,
  client,
  sentMessage,
  guild,
}: IDeleteGuildSlashCommands) => {
  const registeredGuildSlashCommands =
    await djsRestHelper.slashCommand.guild.getAll({
      guild,
      client,
    });
  await Promise.all(
    commandsToDelete.map(async (commandName) => {
      const guildCommand = registeredGuildSlashCommands.find(
        (gsc) => gsc.name === commandName,
      );
      if (guildCommand)
        await djsRestHelper.slashCommand.guild.deleteOne({
          client,
          commandId: guildCommand.id,
          guild,
        });
    }),
  );
  await sentMessage.edit({
    content: "Done!",
  });
};

interface IDeleteSlashCommands {
  client: Client<true>;
  sentMessage: Message;
  guild: Guild;
  isGuild: boolean;
  isGlobal: boolean;
  commandsToDelete: string[];
}

const deleteSlashCommands = async ({
  commandsToDelete,
  client,
  guild,
  isGuild,
  sentMessage,
  isGlobal,
}: IDeleteSlashCommands) => {
  if (isGuild) {
    await deleteGuildSlashCommands({
      client,
      guild,
      commandsToDelete,
      sentMessage,
    });
  } else if (isGlobal) {
    await deleteGlobalSlashCommands({
      client,
      commandsToDelete,
      sentMessage,
    });
  }
};

const checkIsGuild = (message: Message) => message.content.includes("--guild");
const checkIsGlobal = (message: Message) =>
  message.content.includes("--global");

export default {
  name: "deleteSlash",
  commands: ["slash delete"],
  execute: async (client, message, args) => {
    if (!args.length) {
      await message.channel.send({
        content: "No commands to delete",
      });
      return;
    }
    if (!checkIsGlobal(message) && !checkIsGuild(message)) {
      await message.channel.send({
        content: "Please specify `--guild` or `--global`",
      });
      return;
    }
    const sentMessage = await message.channel.send({
      content: "Deleting...",
    });

    const commandNameIndex = 2;
    const slashCommandsName = args
      .slice(commandNameIndex)
      .filter((arg) => !arg.startsWith("--"));

    await deleteSlashCommands({
      client,
      guild: message.guild,
      isGuild: checkIsGuild(message),
      sentMessage,
      isGlobal: checkIsGlobal(message),
      commandsToDelete: slashCommandsName,
    });
  },
} as PrefixCommand;
