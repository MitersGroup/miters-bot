import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import {
  ROLE_CONSTANTS,
  getRoleSelectMessageCustomId,
  occupation,
} from "../../constants/roles";
import type { SlashCommand } from "../../handlers/slashCommands.handler";

const slashCommand: SlashCommand = {
  name: ROLE_CONSTANTS.name,
  description: ROLE_CONSTANTS.description,
  async execute(_client, interaction) {
    if (!interaction.inCachedGuild()) {
      await interaction.reply(
        "请在Miters群组内使用本指令。\n链接：https://discord.gg/miters",
      );
      return;
    }

    const { member } = interaction;
    const roleCollection = member.roles.cache;
    const select = new StringSelectMenuBuilder()
      .setCustomId(getRoleSelectMessageCustomId(member.id))
      .setPlaceholder("角色选择")
      .addOptions(
        occupation.map((item) => {
          const selected = roleCollection.some(
            (role) => role.name === item.role,
          );

          return new StringSelectMenuOptionBuilder()
            .setLabel(item.role)
            .setDescription(item.label)
            .setValue(item.role)
            .setDefault(selected);
        }),
      )
      .setMinValues(0)
      .setMaxValues(occupation.length);
    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      select,
    );

    const feedbackChannel = interaction.guild.channels.cache.get(
      process.env.FEEDBACK_CHANNEL_ID,
    );
    if (!feedbackChannel) {
      console.error(
        `\`FEEDBACK_CHANNEL_ID\` ${process.env.FEEDBACK_CHANNEL_ID} not exists in ${interaction.guild.name} `,
      );
      return;
    }

    await interaction.reply({
      content: `
请使用下拉菜单选择您的职业，以个性化您的体验。

角色有助于我们根据您的兴趣和隶属关系为您量身定制内容和讨论。
如果您有任何问题，请随时在 ${feedbackChannel.toString()} 频道中提问。祝您在社区中度过美好的时光！`,
      components: [row],
      ephemeral: true,
    });
  },
};

export default slashCommand;
