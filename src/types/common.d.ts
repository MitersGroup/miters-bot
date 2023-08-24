import { PrefixCommand } from "../commands/prefix/prefixCommands.handler";
import { SlashCommand } from "./utils";
import { Collection } from "discord.js";

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>;
    prefixCommands: Collection<string, PrefixCommand>;
  }
}
