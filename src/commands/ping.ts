import { Client, CommandInteraction } from "discord.js";
import PING_CONSTANTS from "../constants/ping";

export const ping = {
  name: "ping",
  description: PING_CONSTANTS.description,
  async execute(_client: Client, interaction: CommandInteraction) {
    await interaction.reply(PING_CONSTANTS.pong);
  },
};
