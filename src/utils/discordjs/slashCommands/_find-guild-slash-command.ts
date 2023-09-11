import type { ApplicationCommand, Client, Guild } from "discord.js";
import { Routes } from "discord.js";
import { djsRestClient } from "./client";

export interface IGetGuildSlashCommands {
  client: Client<true>;
  guild: Guild;
  commandId: string;
}

export const findGuildSlashCommand = async ({
  guild,
  client,
  commandId,
}: IGetGuildSlashCommands): Promise<ApplicationCommand | null> => {
  try {
    const data = await djsRestClient.get(
      Routes.applicationGuildCommand(client.user.id, guild.id, commandId),
    );

    return data as ApplicationCommand;
  } catch (error) {
    console.error(error);
    return null;
  }
};
