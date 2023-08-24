import { PrefixCommand } from "../commands/prefix/prefixCommands.handler";
import { Collection } from "discord.js";
import { SlashCommand } from "../commands/slash/slashCommands.handler";

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>;
    prefixCommands: Collection<string, PrefixCommand>;
  }
}
