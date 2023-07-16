import { Client, CommandInteraction } from "discord.js";

export const ping = {
  name: "ping",
  description: 'Test command. Will reply with "Pong!".',
  async execute(_client: Client, interaction: CommandInteraction) {
    await interaction.reply("Pong!");
  },
};
