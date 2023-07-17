import { Client, CommandInteraction } from "discord.js";
import contents from "../contents/ping";

export const ping = {
  name: "ping",
  description: contents.DESCRIPTION,
  async execute(_client: Client, interaction: CommandInteraction) {
    await interaction.reply(contents.PONG);
  },
};
