import { EmbedBuilder, type MessageReaction } from "discord.js";
import type { MessageReactionAddEvent } from "../../handlers/messageReactionAddEvents.handler";

const reportEmojis = process.env.REPORT_EMOJIS.split(",");
const reportEmojiAmount = Number(process.env.REPORT_EMOJI_AMOUNT);
const reportChannelId = process.env.REPORT_CHANNEL_ID;

const generateEmbedMessage = (reaction: MessageReaction): EmbedBuilder =>
  new EmbedBuilder().setTitle("Message Report").addFields(
    {
      name: "Message",
      value: reaction.message.content ?? "No content",
      inline: true,
    },
    {
      name: "Author",
      value: reaction.message.author?.toString() ?? "No author",
      inline: true,
    },
    {
      name: "Link",
      value: `[Jump to message](${reaction.message.url})`,
      inline: true,
    },
  );

const event: MessageReactionAddEvent = {
  execute: async (client, reaction) => {
    if (!reportEmojis.length || !reportEmojiAmount || !reportChannelId) {
      console.error("Report env config not found.");
      return;
    }
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error(
          "Something went wrong when fetching the message: ",
          error,
        );
        return;
      }
    }
    if (
      reaction.message.author?.bot === true ||
      reportEmojis.every((emoji) => emoji !== reaction.emoji.name) ||
      reaction.count === null ||
      reaction.count < reportEmojiAmount
    )
      return;

    const embed = generateEmbedMessage(reaction);

    const channel = client.channels.cache.get(reportChannelId);

    if (!channel) {
      console.error("Report channel not found.");
      return;
    }

    if (!channel.isTextBased()) {
      console.error("Report channel is not text based.");
      return;
    }

    await channel.send({ embeds: [embed] });
  },
};

export default event;
