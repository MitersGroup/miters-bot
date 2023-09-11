import type { BaseInteraction, Client } from "discord.js";
import { Events } from "discord.js";
import { importFiles } from "../utils/filesImport";

export interface InteractionCreateEvent {
  execute: (
    client: Client<true>,
    interaction: BaseInteraction,
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
    client.on(Events.InteractionCreate, async (interaction: BaseInteraction) =>
      data.execute(client, interaction),
    );
  });
};
