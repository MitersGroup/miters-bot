import { Message } from "discord.js";
import { MessageCreateEvent } from "./messageCreateEvents.handler";
import searchPrefixCommand from "../../utils/searchPrefixCommand";

const isSentByUser = (message: Message) => !message.author.bot;

const event: MessageCreateEvent = {
  execute: async (client, message: Message) => {
    if (!message.inGuild()) return;
    if (isSentByUser(message)) {
      const result = searchPrefixCommand(client, message);
      if (!result) return;

      await result.command.execute(client, message, result.args);
    }
  },
};

export default event;
