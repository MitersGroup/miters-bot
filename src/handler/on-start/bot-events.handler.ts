import { handlerFileFilter, handlerRoot } from "./constant";
import { BotEvent } from "../../types/utils";
import { Client } from "discord.js";
import { importFiles } from "../../utils/files-import";

export default async function registerBotEvents(client: Client) {
  const commands = await importFiles<BotEvent>({
    path: `./${handlerRoot}/events`,
    options: {
      fileFilter: [handlerFileFilter],
    },
  });
  commands.forEach(({ data }) => {
    if (data.once) {
      client.once(data.eventName, (...args) => data.execute(client, ...args));
    } else {
      client.on(data.eventName, (...args) => data.execute(client, ...args));
    }
  });
}
