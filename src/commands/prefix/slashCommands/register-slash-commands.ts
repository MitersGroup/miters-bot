import { Client, Guild, Message } from "discord.js";
import { PrefixCommand } from "../prefixCommands.handler";
import djsRestHelper from "../../../utils/discordjs/slashCommands";
import { listSlashCommands } from "../../../utils/slashCommandsListing";

interface IPutSlashCommandsToGlobal {
  client: Client<true>;
  sentMessage: Message;
  slashCommands: Awaited<ReturnType<typeof listSlashCommands>>;
}

const putSlashCommandsToGlobal = async ({
  slashCommands,
  client,
  sentMessage,
}: IPutSlashCommandsToGlobal) => {
  await Promise.all(
    slashCommands.map(async (command) => {
      await djsRestHelper.slashCommand.global.createOne({
        client,
        commands: command.builder.toJSON(),
      });
    }),
  );
  await sentMessage.edit({
    content: "Done!",
  });
};

interface IPutSlashCommandsToGuild {
  client: Client<true>;
  sentMessage: Message;
  guild: Guild;
  slashCommands: Awaited<ReturnType<typeof listSlashCommands>>;
}

const putSlashCommandsToGuild = async ({
  guild,
  slashCommands,
  client,
  sentMessage,
}: IPutSlashCommandsToGuild) => {
  await Promise.all(
    slashCommands.map(async (command) => {
      await djsRestHelper.slashCommand.guild.createOne({
        client,
        guild,
        commands: command.builder.toJSON(),
      });
    }),
  );

  await sentMessage.edit({
    content: "Done!",
  });
};

interface IRegisterSlashCommands {
  client: Client<true>;
  sentMessage: Message;
  guild: Guild;
  slashCommands: Awaited<ReturnType<typeof listSlashCommands>>;
  isGuild: boolean;
  isGlobal: boolean;
}

const registerSlashCommands = async ({
  slashCommands,
  client,
  sentMessage,
  isGuild,
  guild,
  isGlobal,
}: IRegisterSlashCommands) => {
  if (isGuild) {
    await putSlashCommandsToGuild({
      client,
      guild,
      slashCommands,
      sentMessage,
    });
  } else if (isGlobal) {
    await putSlashCommandsToGlobal({
      client,
      slashCommands,
      sentMessage,
    });
  }
};

const isGuild = (message: Message) => message.content.includes("--guild");
const isGlobal = (message: Message) => message.content.includes("--global");

const command: PrefixCommand = {
  name: "registerSlash",
  commands: ["slash register"],
  execute: async (client, message, args) => {
    const slashCommands = await listSlashCommands();

    const commandsToRegister = slashCommands.filter((sc) =>
      args.includes(sc.name),
    );
    if (!commandsToRegister.length) {
      await message.channel.send({
        content: "No commands to register",
      });
      return;
    }
    if (!isGuild(message) && !isGlobal(message)) {
      await message.channel.send({
        content: "Please specify `--guild` or `--global`",
      });
      return;
    }
    const sentMessage = await message.channel.send({
      content: "Registering...",
    });

    await registerSlashCommands({
      guild: message.guild,
      client,
      sentMessage,
      isGuild: isGuild(message),
      isGlobal: isGlobal(message),
      slashCommands: commandsToRegister,
    });
  },
};

export default command;
