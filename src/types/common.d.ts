import { Collection } from "discord.js";
import { PrefixCommand } from "../handlers/prefixCommands.handler";
import { SlashCommand } from "../handlers/slashCommands.handler";

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>;
    prefixCommands: Collection<string, PrefixCommand>;
  }
}
