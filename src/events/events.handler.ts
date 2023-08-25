import { Client } from "discord.js";
import { loadClientReadyEvents } from "./client-ready/clientReadyEvents.handler";
import { loadInteractionCreateEvents } from "./interaction-create/interactionCreateEvents.handler";

export default async function registerEvents(client: Client) {
  console.log("Loading events...");
  return Promise.all([
    loadClientReadyEvents(client),
    loadInteractionCreateEvents(client),
  ]);
}
