import type { PrefixCommand } from "../../handlers/prefixCommands.handler";

const command: PrefixCommand = {
  name: "ping",
  commands: ["ping"],
  execute: async (_client, message) => {
    await message.channel.send("pong");
  },
};

export default command;
