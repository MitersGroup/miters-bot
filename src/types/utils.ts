import {
  ChatInputCommandInteraction,
  Client,
  ClientEvents,
  Message,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";

export interface BotEvent {
  once: boolean;
  eventName: keyof ClientEvents;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (client: Client<true>, ...args: any[]) => Promise<void>;
}
