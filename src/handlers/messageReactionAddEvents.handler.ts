import type { Client, ClientEvents } from "discord.js";
import { Events } from "discord.js";
import { importFiles } from "../utils/filesImport";

export interface MessageReactionAddEvent {
  execute: (
    client: Client<true>,
    reaction: ClientEvents["messageReactionAdd"][0],
    user: ClientEvents["messageReactionAdd"][1],
  ) => Promise<void> | void;
}

export const loadMessageReactionAddEvents = async (
  client: Client,
): Promise<void> => {
  const events = await importFiles<MessageReactionAddEvent>({
    path: `events/message-reaction-add`,
  });
  console.log(`Loaded (${events.length}) message-reaction-add events`);
  events.forEach(({ data }) => {
    client.on(Events.MessageReactionAdd, async (reaction, user) =>
      data.execute(client, reaction, user),
    );
  });
};
