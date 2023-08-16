import { REST } from "discord.js";

export const djsRestClient = new REST().setToken(process.env.DISCORD_TOKEN);
