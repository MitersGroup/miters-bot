import type { Client } from "discord.js";
import { Events } from "discord.js";
import { importFiles } from "../utils/filesImport";

export interface ClientReadyEvent {
  execute: (client: Client<true>) => Promise<void> | void;
}

export const loadClientReadyEvents = async (client: Client): Promise<void> => {
  const events = await importFiles<ClientReadyEvent>({
    path: `events/client-ready`,
  });
  console.log(`Loaded (${events.length}) client-ready events`);
  events.forEach(({ data }) => {
    client.once(Events.ClientReady, async () => data.execute(client));
  });
};
