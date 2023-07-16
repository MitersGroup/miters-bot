import {
  BaseInteraction,
  ChatInputCommandInteraction,
  Client,
  CommandInteraction,
  Events,
} from "discord.js";
import { ping } from "./ping";

interface Command {
  name: string;
  description: string;
  execute: (client: Client, interaction: CommandInteraction) => Promise<void>;
}

export const commands: Command[] = [ping];

const handleCommand = async (
  client: Client,
  interaction: ChatInputCommandInteraction,
): Promise<void> => {
  const commandExecuting = commands.find(
    (command) => command.name === interaction.commandName,
  );

  if (!commandExecuting) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await commandExecuting.execute(client, interaction);
  } catch (error) {
    console.error(error);
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
  }
};

export const registerCommands = (client: Client<true>): void => {
  client.on(Events.ClientReady, async (onReadyClient: Client<true>) => {
    await onReadyClient.application.commands.set(commands);
  });

  client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }
    await handleCommand(client, interaction);
  });
};
