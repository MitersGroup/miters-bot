import type { Client, Message } from "discord.js";
import type { PrefixCommand } from "../handlers/prefixCommands.handler";

const BOT_PREFIX = process.env.PREFIX;

const trimWhitespace = (str: string): string =>
  str.split("\n").join("").replace(/\s+/gu, " ").trim();

const isBotCommand = (client: Client<true>, message: Message): boolean =>
  trimWhitespace(message.content)
    .toLowerCase()
    .startsWith(BOT_PREFIX.toLowerCase()) ||
  message.mentions.has(client.user.id);

interface IGenerateArgs {
  prefix: string;
  botId?: string;
  message: Message;
}

const generateArgs = ({ prefix, message, botId }: IGenerateArgs): string[] => {
  const messageContent = trimWhitespace(message.content.toLowerCase());
  let args: string[] = [];
  if (messageContent.startsWith(prefix)) {
    args = messageContent.slice(prefix.length).split(" ");
  } else if (typeof botId !== "undefined" && message.mentions.has(botId)) {
    args = messageContent
      .replace(`<@${botId}>`, "")
      .split(" ")
      .filter((arg) => arg !== "");
  } else {
    args = messageContent.split(" ").filter((arg) => arg !== "");
  }
  return args;
};

const validateCommand = (commands: string[], args: string[]): boolean =>
  commands.some((cmd) =>
    cmd
      .split(" ")
      .every(
        (name, index) => name.toLowerCase() === args[index]?.toLowerCase(),
      ),
  );

const getMatchedCommandLength = (
  commands: string[],
  args: string[],
): number => {
  const matched =
    commands.find((cmd) =>
      cmd
        .split(" ")
        .every(
          (name, index) => name.toLowerCase() === args[index]?.toLowerCase(),
        ),
    ) ?? "";
  return matched.split(" ").length;
};

const searchPrefixCommand = (
  client: Client<true>,
  message: Message,
): { command: PrefixCommand; args: string[] } | null => {
  const messageContent = trimWhitespace(message.content.toLowerCase());
  if (messageContent === "") return null;
  let args: string[] = [];
  let command = null;

  if (isBotCommand(client, message)) {
    args = generateArgs({
      botId: client.user.id,
      prefix: BOT_PREFIX,
      message,
    });
  }

  const matchedCommands = client.prefixCommands.filter((cmd) =>
    validateCommand(cmd.commands, args),
  );
  command = matchedCommands
    .sort(
      (cmd1, cmd2) =>
        getMatchedCommandLength(cmd2.commands, args) -
        getMatchedCommandLength(cmd1.commands, args),
    )
    .first();

  return command ? { command, args } : null;
};

export default searchPrefixCommand;
