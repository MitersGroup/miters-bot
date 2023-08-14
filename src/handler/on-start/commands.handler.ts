import { handlerFileFilter, handlerRoot } from "./constant";
import { Client } from "discord.js";
import { SlashCommand } from "../../types/utils";
import { importFiles } from "../../utils/files-import";

const loadSlashCommands = async (client: Client) => {
  const commands = await importFiles<SlashCommand>({
    path: `./${handlerRoot}/commands`,
    options: {
      fileFilter: [handlerFileFilter, "!*.type.ts", "!constant.ts"],
    },
  });
  commands.forEach(({ data }) => {
    if (!data.name) return;
    client.slashCommands.set(data.name, data);
  });

  const testingCommands = commands.filter(({ data }) => !data.production);
  const productionCommands = commands.filter(({ data }) => data.production);

  // This is not recommended to set slash command on every restart
  if (process.env.TESTING_GUILD_ID) {
    await client.application?.commands.set(
      testingCommands.map(({ data }) => ({
        name: data.name,
        description: data.description,
      })),
      process.env.TESTING_GUILD_ID,
    );
  }

  await client.application?.commands.set(
    productionCommands.map(({ data }) => ({
      name: data.name,
      description: data.description,
    })),
  );
};

export default function registerCommands(client: Client) {
  return Promise.all([loadSlashCommands(client)]);
}
