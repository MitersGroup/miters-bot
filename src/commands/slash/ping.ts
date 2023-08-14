import { SlashCommand } from "../../types/utils";
import contents from "../../contents/ping";

export default {
  name: "ping",
  description: contents.DESCRIPTION,
  production: false,
  type: "subcommand",
  execute: async (_client, interaction) => {
    await interaction.reply(contents.PONG);
  },
} as SlashCommand;
