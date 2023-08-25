import { Client, ClientEvents } from "discord.js";
import { loadClientReadyEvents } from "./client-ready/clientReadyEvents.handler";
import { loadInteractionCreateEvents } from "./interaction-create/interactionCreateEvents.handler";

export interface BotEvent {
  once: boolean;
  eventName: keyof ClientEvents;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (client: Client<true>, ...args: any[]) => Promise<void>;
}

export default async function registerEvents(client: Client) {
  console.log("Loading events...");
  return Promise.all([
    loadClientReadyEvents(client),
    loadInteractionCreateEvents(client),
  ]);
}
