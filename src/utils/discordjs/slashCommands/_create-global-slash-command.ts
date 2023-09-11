import type {
  ApplicationCommand,
  Client,
  SlashCommandBuilder,
} from "discord.js";
import { Routes } from "discord.js";
import { djsRestClient } from "./client";

export interface ICreateGlobalSlashCommand {
  client: Client<true>;
  commands: ReturnType<SlashCommandBuilder["toJSON"]>;
}

export const createGlobalSlashCommand = async ({
  commands,
  client,
}: ICreateGlobalSlashCommand): Promise<ApplicationCommand | null> => {
  try {
    const data = await djsRestClient.post(
      Routes.applicationCommands(client.user.id),
      {
        body: commands,
      },
    );
    return data as ApplicationCommand;
  } catch (error) {
    console.error(error);
    return null;
  }
};
