import type { ChatInputCommandInteraction } from "discord.js";
import type { InteractionCreateEvent } from "../../handlers/interactionCreateEvents.handler";

const replyError = async (
  interaction: ChatInputCommandInteraction,
): Promise<void> => {
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

const event: InteractionCreateEvent = {
  execute: async (client, interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const { commandName } = interaction;
    console.log(commandName);
    const command = client.slashCommands.get(commandName);

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
