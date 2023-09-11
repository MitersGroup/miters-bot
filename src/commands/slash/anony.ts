import type { Client, CommandInteraction } from "discord.js";
import ANONY_CONSTANTS from "../../constants/anony";
import { EmbedBuilder } from "discord.js";
import type { SlashCommand } from "../../handlers/slashCommands.handler";

const slashCommand: SlashCommand = {
  name: ANONY_CONSTANTS.name,
  description: ANONY_CONSTANTS.description,
  type: "command",
  builder: (command) =>
    command
      .addStringOption((option) =>
        option
          .setName(ANONY_CONSTANTS.subCommandTitleName)
          .setDescription(ANONY_CONSTANTS.subCommandTitleDescription)
          .setRequired(true),
      )
      .addStringOption((option) =>
        option
          .setName(ANONY_CONSTANTS.subCommandMessageName)
          .setDescription(ANONY_CONSTANTS.subCommandMessageDescription)
          .setRequired(true),
      ),
  async execute(client: Client, interaction: CommandInteraction) {
    const channel = client.channels.cache.get(
      process.env.ANONYMOUS_APPROVAL_CHANNEL_ID,
    );
    if (!channel) {
      console.error("Anonymous channel not found.");
      return;
    }
    if (channel.isTextBased()) {
      const embed = new EmbedBuilder()
        .setColor(ANONY_CONSTANTS.defaultColorCode)
        .setTitle(
          `${
            interaction.options.data.find(
              (data) => data.name === ANONY_CONSTANTS.subCommandTitleName,
            )?.value ?? "Untitled"
          }`,
        )
        .setAuthor({
          name: `${interaction.user.username}#${interaction.user.id}`,
          iconURL: interaction.user.displayAvatarURL(),
        })
        .addFields({
          name: ANONY_CONSTANTS.contentLabel,
          value:
            (interaction.options.data.find(
              (data) => data.name === ANONY_CONSTANTS.subCommandMessageName,
            )?.value as string) || "No content",
        });
      const message = await channel.send({ embeds: [embed] });
      await message.react(ANONY_CONSTANTS.approveEmoji);
      await message.react(ANONY_CONSTANTS.rejectEmoji);
    }
  },
};

export default slashCommand;
