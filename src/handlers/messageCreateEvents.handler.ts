import type { Client, Message } from "discord.js";
import { Events } from "discord.js";
import { importFiles } from "../utils/filesImport";

export interface MessageCreateEvent {
  execute: (client: Client<true>, message: Message) => Promise<void> | void;
}

export const loadMessageCreateEvents = async (
  client: Client,
): Promise<void> => {
  const events = await importFiles<MessageCreateEvent>({
    path: `events/message-create`,
  });
  console.log(`Loaded (${events.length}) message-create events`);
  events.forEach(({ data }) => {
    client.on(Events.MessageCreate, async (message: Message) =>
      data.execute(client, message),
    );
  });
};
