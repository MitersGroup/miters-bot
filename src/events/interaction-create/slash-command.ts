import { ChatInputCommandInteraction, Client } from "discord.js";
import { InteractionCreateEvent } from "../../handlers/interactionCreateEvents.handler";

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

const searchSlashCommand = (
  client: Client,
  interaction: ChatInputCommandInteraction,
) => {
  const { commandName } = interaction;
  const subcommandGroupName = interaction.options.getSubcommandGroup();
  const subcommandName = interaction.options.getSubcommand(false);
  const searchCommandName = [commandName, subcommandGroupName, subcommandName]
    .filter((name) => name)
    .join(" ");
  console.log(searchCommandName);
  return client.slashCommands.get(searchCommandName);
};

const event: InteractionCreateEvent = {
  execute: async (client, interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const command = searchSlashCommand(client, interaction);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`,
      );
      return;
    }

    try {
      await command.execute(client, interaction);
    } catch (error) {
      console.error(error);
      await replyError(interaction);
    }
  },
};

export default event;
