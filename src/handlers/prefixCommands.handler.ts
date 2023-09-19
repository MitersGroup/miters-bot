import type { Client, Message } from "discord.js";
import { importFiles } from "../utils/filesImport";

export interface PrefixCommand {
  name: string;
  commands: string[];
  execute: (
    client: Client<true>,
    message: Message<true>,
    args: string[],
  ) => Promise<void> | void;
}

export const loadPrefixCommands = async (client: Client): Promise<void> => {
  const commands = await importFiles<PrefixCommand>({
    path: `commands/prefix`,
  });
  console.log(`Loaded (${commands.length}) prefix commands`);
  commands.forEach(({ data }) => {
    if (client.prefixCommands.has(data.name)) {
      console.error(`Prefix command "${data.name}" already exists!`);
      return;
    }
    client.prefixCommands.set(data.name, data);
  });
};
