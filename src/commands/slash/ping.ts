import PING_CONSTANTS from "../../constants/ping";
import type { SlashCommand } from "../../handlers/slashCommands.handler";

const slashCommand: SlashCommand = {
  name: "ping",
  description: PING_CONSTANTS.description,
  type: "command",
  builder: (command) =>
    command.addStringOption((option) =>
      option.setName("test").setDescription("test"),
    ),
  execute: async (_client, interaction) => {
    await interaction.reply(PING_CONSTANTS.pong);
  },
};

export default slashCommand;
