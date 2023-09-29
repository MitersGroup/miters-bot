import type { Client, ClientEvents } from "discord.js";
import { Events } from "discord.js";
import { importFiles } from "../utils/filesImport";

export interface InteractionCreateEvent {
  execute: (
    client: Client<true>,
    interaction: ClientEvents["interactionCreate"][0],
  ) => Promise<void> | void;
}

export const loadInteractionCreateEvents = async (
  client: Client,
): Promise<void> => {
  const events = await importFiles<InteractionCreateEvent>({
    path: `events/interaction-create`,
  });
  console.log(`Loaded (${events.length}) interaction-create events`);
  events.forEach(({ data }) => {
    client.on(Events.InteractionCreate, async (interaction) =>
      data.execute(client, interaction),
    );
  });
};
