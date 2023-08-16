import { Client, Guild, Routes } from "discord.js";
import { djsRestClient } from "./client";

export interface IDeleteGuildSlashCommand {
  client: Client<true>;
  guild: Guild;
  commandId: string;
}

export const deleteGuildSlashCommand = async ({
  client,
  guild,
  commandId,
}: IDeleteGuildSlashCommand) => {
  try {
    await djsRestClient.delete(
      Routes.applicationGuildCommand(client.user.id, guild.id, commandId),
    );
  } catch (error) {
    console.error(error);
  }
};
