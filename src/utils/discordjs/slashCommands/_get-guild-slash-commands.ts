import { ApplicationCommand, Client, Guild, Routes } from "discord.js";
import { djsRestClient } from "./client";

export interface IGetGuildSlashCommands {
  client: Client;
  guild: Guild;
}

export const getGuildSlashCommands = async ({
  guild,
  client,
}: IGetGuildSlashCommands) => {
  if (!client.user) return [];

  try {
    const data = await djsRestClient.get(
      Routes.applicationGuildCommands(client.user.id, guild.id),
    );

    return data as ApplicationCommand[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
