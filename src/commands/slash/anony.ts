import type { Client, CommandInteraction } from "discord.js";
import ANONY_CONSTANTS from "../../constants/anony";
import { EmbedBuilder } from "discord.js";
import type { SlashCommand } from "../../handlers/slashCommands.handler";

const slashCommand: SlashCommand = {
  name: ANONY_CONSTANTS.name,
  description: ANONY_CONSTANTS.description,
  options: [
    {
      name: ANONY_CONSTANTS.subCommandTitleName,
      description: ANONY_CONSTANTS.subCommandTitleDescription,
      type: "string",
      required: true,
    },
    {
      name: ANONY_CONSTANTS.subCommandMessageName,
      description: ANONY_CONSTANTS.subCommandMessageDescription,
      type: "string",
      required: true,
    },
  ],

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
      await interaction.reply("发送成功！请等待管理员审核…");
    }
  },
};

export default slashCommand;
