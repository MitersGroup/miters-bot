import type { Client } from "discord.js";
import { loadClientReadyEvents } from "./clientReadyEvents.handler";
import { loadInteractionCreateEvents } from "./interactionCreateEvents.handler";
import { loadMessageCreateEvents } from "./messageCreateEvents.handler";
import { loadMessageReactionAddEvents } from "./messageReactionAddEvents.handler";

export default async function registerEvents(client: Client): Promise<void> {
  console.log("Loading events...");
  await Promise.all([
    loadClientReadyEvents(client),
    loadInteractionCreateEvents(client),
    loadMessageCreateEvents(client),
    loadMessageReactionAddEvents(client),
  ]);
}
