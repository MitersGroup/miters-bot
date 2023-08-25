import { Client, Events, Message } from "discord.js";
import { importFiles } from "../../utils/filesImport";

export interface MessageCreateEvent {
  execute: (client: Client<true>, message: Message) => void | Promise<void>;
}

export const loadMessageCreateEvents = async (client: Client) => {
  const events = await importFiles<MessageCreateEvent>({
    path: `events/message-create`,
  });
  console.log(`Loaded (${events.length}) message-create events`);
  events.forEach(({ data }) => {
    client.on(Events.MessageCreate, (message: Message) =>
      data.execute(client, message),
    );
  });
};
