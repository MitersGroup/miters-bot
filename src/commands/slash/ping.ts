import PING_CONSTANTS from "../../constants/ping";
import { SlashCommand } from "./slashCommands.handler";

const command: SlashCommand = {
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

export default command;
