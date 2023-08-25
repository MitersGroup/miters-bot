import { PrefixCommand } from "../../handlers/prefixCommands.handler";

const command: PrefixCommand = {
  name: "ping",
  commands: ["ping"],
  execute: async (_Client, message) => {
    await message.channel.send("pong");
  },
};

export default command;
