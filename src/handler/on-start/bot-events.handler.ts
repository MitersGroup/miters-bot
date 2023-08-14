import { BotEvent } from "../../types/utils";
import { Client } from "discord.js";
import { importFiles } from "../../utils/filesImport";

export default async function registerBotEvents(client: Client) {
  const commands = await importFiles<BotEvent>({
    path: `events`,
  });
  commands.forEach(({ data }) => {
    if (data.once) {
      client.once(data.eventName, (...args) => data.execute(client, ...args));
    } else {
      client.on(data.eventName, (...args) => data.execute(client, ...args));
    }
  });
}
