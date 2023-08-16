import {
  ChatInputCommandInteraction,
  Client,
  ClientEvents,
  Message,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";

interface SlashCommandBase {
  name: string;
  description: string;
  execute: (
    client: Client,
    interaction: ChatInputCommandInteraction,
  ) => Promise<void>;
}

export interface SlashCommandRoot extends SlashCommandBase {
  type: "command";
  builder?: (command: SlashCommandBuilder) => Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (client: Client<true>, ...args: any[]) => Promise<void>;
}

export interface PrefixCommand {
  name: string;
  commands: string[];
  execute: (
    client: Client<true>,
    message: Message<true>,
    args: string[],
  ) => void | Promise<void>;
}
