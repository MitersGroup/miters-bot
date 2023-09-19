import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import type { PrefixCommand } from "../../handlers/prefixCommands.handler";
import { occupation as occupationOptions } from "../../constants/roles";

const command: PrefixCommand = {
  name: "role",
  commands: ["role"],
  execute: async (_client, message) => {
    const select = new StringSelectMenuBuilder()
      .setCustomId("starter")
      .setPlaceholder("Make a selection!")
      .addOptions(
        occupationOptions.map((item) =>
          new StringSelectMenuOptionBuilder()
            .setLabel(item.role)
            .setDescription(item.label)
            .setValue(item.role),
        ),
      );

    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      select,
    );
    const feedbackChannel = message.guild.channels.cache.get(
      process.env.FEEDBACK_CHANNEL_ID,
    );
    if (!feedbackChannel) {
      console.error(
        `\`FEEDBACK_CHANNEL_ID\` ${process.env.FEEDBACK_CHANNEL_ID} not exists in ${message.guild.name} `,
      );
      return;
    }
    await message.channel.send({
      content: `
🌟 **欢迎来到 Miters Discord 服务器！** 🌟

请使用下拉菜单选择您的职业，以个性化您的体验。

角色有助于我们根据您的兴趣和隶属关系为您量身定制内容和讨论。
如果您有任何问题，请随时在 ${feedbackChannel.toString()} 频道中提问。祝您在社区中度过美好的时光！
`,
      components: [row],
    });
  },
};

export default command;
