import type {
  Client,
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  User,
} from "discord.js";
import { Events } from "discord.js";
import { importFiles } from "../utils/filesImport";

export interface MessageReactionAddEvent {
  execute: (
    client: Client<true>,
    reaction: MessageReaction | PartialMessageReaction,
    user: PartialUser | User,
  ) => Promise<void> | void;
}

export const loadMessageReactionAddEvents = async (
  client: Client,
): Promise<void> => {
  const events = await importFiles<MessageReactionAddEvent>({
    path: `events/message-create`,
  });
  console.log(`Loaded (${events.length}) message-reaction-add events`);
  events.forEach(({ data }) => {
    client.on(
      Events.MessageReactionAdd,
      async (
        reaction: MessageReaction | PartialMessageReaction,
        user: PartialUser | User,
      ) => data.execute(client, reaction, user),
    );
  });
};
