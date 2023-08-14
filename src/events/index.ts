import { Client } from 'discord.js';
import reactionAddEvent from './reactionAdd';

interface Event {
  name: string;
  execute: (client: Client, ...args: any[]) => Promise<void>;
}
export const events: Event[] = [reactionAddEvent];

export const registerEvents = (client: Client<true>): void => {
  events.forEach((event) => {
    client.on(
      event.name,
      async (...args) => await event.execute(client, ...args),
    );
  });
};
