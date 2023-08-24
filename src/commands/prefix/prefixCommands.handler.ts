import { Client, Message } from "discord.js";
import { importFiles } from "../../utils/filesImport";

export interface PrefixCommand {
  name: string;
  commands: string[];
  execute: (
    client: Client<true>,
    message: Message<true>,
    args: string[],
  ) => void | Promise<void>;
}

export const loadPrefixCommands = async (client: Client) => {
  const commands = await importFiles<PrefixCommand>({
    path: `commands/prefix`,
  });
  console.log(`Loaded (${commands.length}) prefix commands`);
  commands.forEach(({ data }) => {
    if (client.prefixCommands.has(data.name)) {
      throw Error(`Prefix command "${data.name}" already exists!`);
    }
    client.prefixCommands.set(data.name, data);
  });
};
