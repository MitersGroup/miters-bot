import {
  Client,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import ANONY_CONSTANTS from "../constants/anony";

export const anonyCommand = {
  data: new SlashCommandBuilder()
    .setName(ANONY_CONSTANTS.name)
    .setDescription(ANONY_CONSTANTS.description)
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
    if (channel?.isTextBased()) {
      const embed = new EmbedBuilder()
        .setColor(ANONY_CONSTANTS.defaultColorCode)
        .setTitle(
          `(#${new Date().getTime()}) ${
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
