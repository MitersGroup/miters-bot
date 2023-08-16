import { Client, Routes } from "discord.js";
import { djsRestClient } from "./client";

export interface IDeleteGuildSlashCommand {
  client: Client<true>;
  commandId: string;
}

export const deleteGlobalSlashCommand = async ({
  client,
  commandId,
}: IDeleteGuildSlashCommand) => {
  try {
    await djsRestClient.delete(
      Routes.applicationCommand(client.user.id, commandId),
    );
  } catch (error) {
    console.error(error);
  }
};
