import { Events, Message } from "discord.js";
import { BotEvent } from "../../types/utils";
import searchPrefixCommand from "../../utils/searchPrefixCommand";

const isSentByUser = (message: Message) => !message.author.bot;

export default {
  eventName: Events.MessageCreate,
  once: false,
  execute: async (client, message: Message) => {
    if (!message.inGuild()) return;
    if (isSentByUser(message)) {
      const result = searchPrefixCommand(client, message);
      if (!result) return;

      await result.command.execute(client, message, result.args);
    }
  },
} as BotEvent;
