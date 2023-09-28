import type {
  ChatInputCommandInteraction,
  Client,
  CommandInteraction,
  ForumChannel,
} from "discord.js";
import { ChannelType } from "discord.js";
import { POST_CONSTANTS } from "../../constants/post";
import type { SlashCommand } from "../../handlers/slashCommands.handler";

const getTargetChannel = (
  client: Client,
  interaction: ChatInputCommandInteraction,
): ForumChannel => {
  const isTechnical = interaction.options.getBoolean("technical");
  if (isTechnical === null) {
    throw new Error("`isTechnical` option not exists!");
  }
  const channel = client.channels.cache.get(
    isTechnical
      ? process.env.TECHNICAL_FORUM_CHANNEL_ID
      : process.env.GENERAL_FORUM_CHANNEL_ID,
  );
  if (!channel) {
    throw new Error(
      isTechnical ? "Technical forum not exists" : "General forum not exists",
    );
  }
  if (channel.type !== ChannelType.GuildForum) {
    throw new Error(
      isTechnical
        ? "Env `TECHNICAL_FORUM_CHANNEL_ID` is not forum."
        : "Env `GENERAL_FORUM_CHANNEL_ID` is not forum.",
    );
  }
  return channel;
};

const slashCommand: SlashCommand = {
  name: POST_CONSTANTS.name,
  description: POST_CONSTANTS.description,
  options: [
    {
      name: "title",
      description: "帖子标题",
      type: "string",
      required: true,
    },
    {
      name: "content",
      description: "帖子内容",
      type: "string",
      required: true,
    },
    {
      name: "technical",
      description: "是否与技术相关？",
      type: "boolean",
      required: true,
    },
  ],
  async execute(client: Client, interaction: CommandInteraction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }
    const channel = getTargetChannel(client, interaction);
    const title = interaction.options.getString("title");
    const content = interaction.options.getString("content");
    if (title === null || content === null) {
      console.error("Title and content is necessary!");
      return;
    }
    const post = await channel.threads.create({
      name: title,
      message: {
        content,
      },
    });
    await interaction.reply(post.url);
  },
};

export default slashCommand;
