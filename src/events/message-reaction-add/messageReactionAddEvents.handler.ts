import {
  Client,
  Events,
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  User,
} from "discord.js";
import { importFiles } from "../../utils/filesImport";

export interface MessageReactionAddEvent {
  execute: (
    client: Client<true>,
    reaction: MessageReaction | PartialMessageReaction,
    user: User | PartialUser,
  ) => void | Promise<void>;
}

export const loadMessageReactionAddEvents = async (client: Client) => {
  const events = await importFiles<MessageReactionAddEvent>({
    path: `events/message-create`,
  });
  console.log(`Loaded (${events.length}) message-create events`);
  events.forEach(({ data }) => {
    client.on(
      Events.MessageReactionAdd,
      (
        reaction: MessageReaction | PartialMessageReaction,
        user: User | PartialUser,
      ) => data.execute(client, reaction, user),
    );
  });
};
