import type { Message } from "discord.js";
import type { MessageCreateEvent } from "../../handlers/messageCreateEvents.handler";
import searchPrefixCommand from "../../utils/searchPrefixCommand";

const isSentByUser = (message: Message): boolean => !message.author.bot;

const event: MessageCreateEvent = {
  execute: async (client, message) => {
    if (!message.inGuild() || !isSentByUser(message)) return;

    const result = searchPrefixCommand(client, message);
    if (!result) return;

    await result.command.execute(client, message, result.args);
  },
};

export default event;
