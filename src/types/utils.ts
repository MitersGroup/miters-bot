import { ChatInputCommandInteraction, Client, ClientEvents } from "discord.js";

export interface SlashCommand {
  name: string;
  description: string;
  production: boolean;
  execute: (
    client: Client<true>,
    interaction: ChatInputCommandInteraction,
  ) => Promise<void>;
}

export interface BotEvent {
  once: boolean;
  eventName: keyof ClientEvents;
  execute: (client: Client<true>, ...args: unknown[]) => Promise<void>;
}
