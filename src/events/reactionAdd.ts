import {
  Client,
  EmbedBuilder,
  Events,
  ForumChannel,
  MessageReaction,
  User,
} from 'discord.js';
import ANONY_CONSTANTS from '../constants/anony';

const reactionAddEvent = {
  name: Events.MessageReactionAdd,
  async execute(client: Client, reaction: MessageReaction, user: User) {
    if (user.bot) return;
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.error(
          'Something went wrong when fetching the message: ',
          error,
        );
        return;
      }
    }

    if (
      reaction.message.channel.id !== process.env.ANONYMOUS_APPROVAL_CHANNEL_ID
    )
      return;
    if (reaction.message.embeds.length !== 1) return;

    // Because reacted submission will have different color code
    if (reaction.message.embeds[0].color !== ANONY_CONSTANTS.defaultColorCode) return;

    if (reaction.emoji.name === ANONY_CONSTANTS.approveEmoji) {
      await reaction.message.reactions.removeAll();
      const embed = new EmbedBuilder()
        .setColor(ANONY_CONSTANTS.approvedColorCode)
        .setTitle(reaction.message.embeds[0].title)
        .setAuthor(reaction.message.embeds[0].author)
        .addFields(reaction.message.embeds[0].fields)
        .addFields({
          name: 'Approved by',
          value: user.username,
        });
      await reaction.message.edit({ embeds: [embed] });
      const channel = client.channels.cache.get(
        process.env.ANONYMOUS_POST_CHANNEL_ID,
      );
      if (channel && 'threads' in channel) {
        await (channel as ForumChannel).threads.create({
          name: reaction.message.embeds[0].title || 'Anonymous',
          message: {
            content:
              reaction.message.embeds[0].fields.find(
                (v) => v.name === ANONY_CONSTANTS.contentLabel,
              )?.value || 'Empty message',
          },
        });
      }
    } else if (reaction.emoji.name === ANONY_CONSTANTS.rejectEmoji) {
      await reaction.message.reactions.removeAll();
      const embed = new EmbedBuilder()
        .setColor(ANONY_CONSTANTS.rejectedColorCode)
        .setTitle(reaction.message.embeds[0].title)
        .setAuthor(reaction.message.embeds[0].author)
        .addFields(reaction.message.embeds[0].fields)
        .addFields({
          name: 'Rejected by',
          value: user.username,
        });
      await reaction.message.edit({ embeds: [embed] });
    }
  },
};

export default reactionAddEvent;
