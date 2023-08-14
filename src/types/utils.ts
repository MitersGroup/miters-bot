import {
  ChatInputCommandInteraction,
  Client,
  ClientEvents,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";

interface SlashCommandBase {
  name: string;
  description: string;
  production: boolean;
  execute: (
    client: Client,
    interaction: ChatInputCommandInteraction,
  ) => Promise<void>;
}

export interface SlashCommandRoot extends SlashCommandBase {
  type: "command";
  builder?: (command: SlashCommandBuilder) => SlashCommandBuilder;
}

export interface SlashCommandSubcommand extends SlashCommandBase {
  type: "subcommand";
  groupName?: string;
  commandName: string;
  builder?: (
    subcommand: SlashCommandSubcommandBuilder,
  ) => SlashCommandSubcommandBuilder;
}

export interface SlashCommandSubcommandGroup extends SlashCommandBase {
  type: "subcommandGroup";
  commandName: string;
}

export type SlashCommand =
  | SlashCommandRoot
  | SlashCommandSubcommand
  | SlashCommandSubcommandGroup;

export interface BotEvent {
  once: boolean;
  eventName: keyof ClientEvents;
  execute: (client: Client<true>, ...args: unknown[]) => Promise<void>;
}
