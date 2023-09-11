import type { Collection } from "discord.js";
import type { PrefixCommand } from "../handlers/prefixCommands.handler";
import type { SlashCommand } from "../handlers/slashCommands.handler";

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>;
    prefixCommands: Collection<string, PrefixCommand>;
  }
}
