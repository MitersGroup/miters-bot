import {
  BaseInteraction,
  ChatInputCommandInteraction,
  Client,
  Events,
  StringSelectMenuInteraction,
} from "discord.js";
import { BotEvent } from "../../types/utils";
import { occupation } from "../../contents/roles";

const searchSlashCommand = (client: Client, interaction: BaseInteraction) => {
  if (!interaction.isCommand() || !interaction.isChatInputCommand())
    return null;
  const { commandName } = interaction;
  const subcommandGroupName = interaction.options.getSubcommandGroup();
  const subcommandName = interaction.options.getSubcommand(false);
  const searchCommandName = [commandName, subcommandGroupName, subcommandName]
    .filter((name) => name)
    .join(" ");
  console.log(searchCommandName);
  return client.slashCommands.get(searchCommandName);
};

const replyError = async (interaction: ChatInputCommandInteraction) => {
  if (interaction.replied || interaction.deferred) {
    await interaction.followUp({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  } else {
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
};

const chatInputCommandHandler = async (
  client: Client<true>,
  interaction: ChatInputCommandInteraction,
) => {
  const command = searchSlashCommand(client, interaction);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    await replyError(interaction);
  }
};

const stringSelectMenuHandler = async (
  interaction: StringSelectMenuInteraction<"cached">,
) => {
  const { roles } = interaction.member;
  const allOccupationRoles = interaction.guild.roles.cache.filter((role) =>
    occupation.map((item) => item.role).includes(role.name),
  );
  await roles.remove(allOccupationRoles);
  await roles.add(
    allOccupationRoles.filter((role) => interaction.values.includes(role.name)),
  );
  await interaction.update({});
};

export default {
  eventName: Events.InteractionCreate,
  once: false,
  execute: async (client, interaction: BaseInteraction) => {
    if (!interaction.guild) return;

    if (interaction.isChatInputCommand()) {
      await chatInputCommandHandler(client, interaction);
    }

    if (
      interaction.isStringSelectMenu() &&
      interaction.inCachedGuild() &&
      interaction.message.id === process.env.ROLE_SELECTION_MESSAGE_ID
    ) {
      await stringSelectMenuHandler(interaction);
    }
  },
} as BotEvent;
