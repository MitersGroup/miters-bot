import { BaseInteraction, Client, Events } from "discord.js";
import { importFiles } from "../utils/filesImport";

export interface InteractionCreateEvent {
  execute: (
    client: Client<true>,
    interaction: BaseInteraction,
  ) => void | Promise<void>;
}

export const loadInteractionCreateEvents = async (client: Client) => {
  const events = await importFiles<InteractionCreateEvent>({
    path: `events/interaction-create`,
  });
  console.log(`Loaded (${events.length}) interaction-create events`);
  events.forEach(({ data }) => {
    client.on(Events.InteractionCreate, (interaction: BaseInteraction) =>
      data.execute(client, interaction),
    );
  });
};
