import { SlashCommand } from "../../types/utils";
import contents from "../../contents/ping";

export default {
  name: "ping",
  description: contents.DESCRIPTION,
  type: "command",
  builder: (command) =>
    command.addStringOption((option) =>
      option.setName("test").setDescription("test"),
    ),
  execute: async (_client, interaction) => {
    await interaction.reply(contents.PONG);
  },
} as SlashCommand;
