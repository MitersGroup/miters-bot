import { Client } from 'discord.js';
import reactionAddEvent from './reactionAdd';

interface Event {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (client: Client, ...args: any[]) => Promise<void>;
}
export const events: Event[] = [reactionAddEvent];

export const registerEvents = (client: Client<true>): void => {
  events.forEach((event) => {
    client.on(
      event.name,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      async (...args) => event.execute(client, ...args),
    );
  });
};
