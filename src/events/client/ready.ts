import { BotEvent } from "../../types/utils";
import { Events } from "discord.js";

export default {
  eventName: Events.ClientReady,
  once: true,
  execute: (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
} as BotEvent;
