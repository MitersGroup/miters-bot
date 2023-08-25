import { Client, Events } from "discord.js";
import { importFiles } from "../utils/filesImport";

export interface ClientReadyEvent {
  execute: (client: Client<true>) => void | Promise<void>;
}

export const loadClientReadyEvents = async (client: Client) => {
  const events = await importFiles<ClientReadyEvent>({
    path: `events/client-ready`,
  });
  console.log(`Loaded (${events.length}) client-ready events`);
  events.forEach(({ data }) => {
    client.once(Events.ClientReady, () => data.execute(client));
  });
};
