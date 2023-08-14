import { PrefixCommand } from "../../types/utils";

export default {
  name: "ping",
  commands: ["ping"],
  execute: async (_Client, message) => {
    await message.channel.send("pong");
  },
} as PrefixCommand;
