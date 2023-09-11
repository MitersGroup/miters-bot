import type {
  ApplicationCommand,
  Client,
  Guild,
  SlashCommandBuilder,
} from "discord.js";
import { Routes } from "discord.js";
import { djsRestClient } from "./client";

export interface ICreateGuildSlashCommand {
  client: Client<true>;
  commands: ReturnType<SlashCommandBuilder["toJSON"]>;
  guild: Guild;
}

export const createGuildSlashCommand = async ({
  commands,
  client,
  guild,
}: ICreateGuildSlashCommand): Promise<ApplicationCommand | null> => {
  try {
    const data = await djsRestClient.post(
      Routes.applicationGuildCommands(client.user.id, guild.id),
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
