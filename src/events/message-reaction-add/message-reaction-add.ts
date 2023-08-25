import {
  Client,
  Embed,
  EmbedBuilder,
  ForumChannel,
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  User,
} from "discord.js";
import ANONY_CONSTANTS from "../../constants/anony";
import { MessageReactionAddEvent } from "../../handlers/messageReactionAddEvents.handler";

const isEmbed = (embed: Embed[]): embed is [Embed] => {
  const expectedEmbedLength = 1;
  return embed.length === expectedEmbedLength;
};

const generateEmbedMessage = (
  type: "APPROVE" | "REJECT",
  embed: Embed,
  user: User | PartialUser,
) => {
  let colorCode: number = ANONY_CONSTANTS.defaultColorCode;
  let fieldName = "";

  if (type === "APPROVE") {
    colorCode = ANONY_CONSTANTS.approvedColorCode;
    fieldName = "Approved by";
  } else {
    colorCode = ANONY_CONSTANTS.rejectedColorCode;
    fieldName = "Rejected by";
  }

  return new EmbedBuilder()
    .setColor(colorCode)
    .setTitle(embed.title)
    .setAuthor(embed.author)
    .addFields(embed.fields)
    .addFields({
      name: fieldName,
      value: user.username ?? "Unknown user",
    });
};

const handleApprove = async ({
  client,
  message,
  user,
  embed,
}: {
  client: Client;
  message: MessageReaction["message"];
  embed: Embed;
  user: User | PartialUser;
}) => {
  await message.reactions.removeAll();
  const embedMessage = generateEmbedMessage("APPROVE", embed, user);
  await message.edit({ embeds: [embedMessage] });
  const channel = client.channels.cache.get(
    process.env.ANONYMOUS_POST_CHANNEL_ID,
  );
  if (channel && "threads" in channel) {
    await (channel as ForumChannel).threads.create({
      name: embed.title ?? "Anonymous",
      message: {
        content:
          embed.fields.find(
            (field) => field.name === ANONY_CONSTANTS.contentLabel,
          )?.value ?? "Empty message",
      },
    });
  }
};

const handleReaction = async ({
  client,
  reaction,
  user,
  embed,
}: {
  client: Client;
  reaction: MessageReaction | PartialMessageReaction;
  embed: Embed;
  user: User | PartialUser;
}) => {
  if (reaction.emoji.name === ANONY_CONSTANTS.approveEmoji) {
    await handleApprove({ client, message: reaction.message, user, embed });
  } else if (reaction.emoji.name === ANONY_CONSTANTS.rejectEmoji) {
    await reaction.message.reactions.removeAll();
    const embedMessage = generateEmbedMessage("REJECT", embed, user);
    await reaction.message.edit({ embeds: [embedMessage] });
  }
};

const event: MessageReactionAddEvent = {
  execute: async (
    client: Client,
    reaction: MessageReaction | PartialMessageReaction,
    user: User | PartialUser,
  ) => {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message: ", error);
      return;
    }

    if (
      reaction.message.channel.id !==
        process.env.ANONYMOUS_APPROVAL_CHANNEL_ID ||
      !isEmbed(reaction.message.embeds) ||
      user.bot
    )
      return;

    const firstIndex = 0;
    const embed = reaction.message.embeds[firstIndex];

    // Because reacted submission will have different color code
    if (
      reaction.message.embeds[firstIndex].color !==
      ANONY_CONSTANTS.defaultColorCode
    )
      return;

    await handleReaction({ client, reaction, user, embed });
  },
};

export default event;
