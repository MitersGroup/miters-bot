import PING_CONSTANTS from "../../constants/ping";
import type { SlashCommand } from "../../handlers/slashCommands.handler";

const slashCommand: SlashCommand = {
  name: "ping",
  description: PING_CONSTANTS.description,
  options: [
    { name: "test", description: "test", required: true, type: "string" },
  ],
  execute: async (_client, interaction) => {
    await interaction.reply(PING_CONSTANTS.pong);
  },
};

export default slashCommand;
