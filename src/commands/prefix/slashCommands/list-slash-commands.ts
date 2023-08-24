import { ApplicationCommand, EmbedBuilder } from "discord.js";
import djsRestHelper from "../../../utils/discordjs/slashCommands";
import { listSlashCommands } from "../../../utils/slashCommandsListing";
import { PrefixCommand } from "../prefixCommands.handler";
import { SlashCommand } from "../../slash/slashCommands.handler";

const renderSymbol = (value: boolean) => (value ? "  ✓   " : "  ✗   ");

interface IRenderRow {
  slashCommand: Awaited<ReturnType<typeof listSlashCommands>>[number];
  global: SlashCommand["name"][];
  guild: SlashCommand["name"][];
}

const renderRow = ({ slashCommand, global, guild }: IRenderRow) =>
  `| ${renderSymbol(global.includes(slashCommand.name))} | ${renderSymbol(
    guild.includes(slashCommand.name),
  )} | ${slashCommand.name}`;

const buildCommandTable = (
  slashCommands: Awaited<ReturnType<typeof listSlashCommands>>,
  registeredGlobalSlashCommands: SlashCommand["name"][],
  registeredGuildSlashCommands: SlashCommand["name"][],
): string =>
  [
    "| global |  guild | name ",
    "| --------------------------------",
    `${slashCommands
      .map((sc) =>
        renderRow({
          slashCommand: sc,
          global: registeredGlobalSlashCommands,
          guild: registeredGuildSlashCommands,
        }),
      )
      .join("\n")}`,
  ].join("\n");

const buildEmbed = (commandTable: string) =>
  new EmbedBuilder()
    .setTitle("Slash Commands")
    .setDescription(`\`\`\`${commandTable}\`\`\``)
    .addFields(
      {
        name: "Commands",
        value: "`register [name1] [name2] ...`\n`delete [name1] [name2] ...`",
        inline: true,
      },
      {
        name: "Flags",
        value: "`--guild` `--global`",
        inline: true,
      },
    );

const getRegisteredSlashCommands = (
  slashCommands: Awaited<ReturnType<typeof listSlashCommands>>,
  commandsToCheck: ApplicationCommand[],
): SlashCommand["name"][] =>
  slashCommands
    .filter((slashCommand) =>
      commandsToCheck.find(
        (commandToCheck) => commandToCheck.name === slashCommand.builder.name,
      ),
    )
    .map((slashCommand) => slashCommand.name);

const command: PrefixCommand = {
  name: "listSlash",
  commands: ["slash"],
  execute: async (client, message) => {
    const slashCommands = await listSlashCommands();
    const guildSlashCommands = await djsRestHelper.slashCommand.guild.getAll({
      client,
      guild: message.guild,
    });
    const globalSlashCommands = await djsRestHelper.slashCommand.global.getAll({
      client,
    });

    const registeredGlobalSlashCommands = getRegisteredSlashCommands(
      slashCommands,
      globalSlashCommands,
    );
    const registeredGuildSlashCommands = getRegisteredSlashCommands(
      slashCommands,
      guildSlashCommands,
    );

    const commandTable = buildCommandTable(
      slashCommands,
      registeredGlobalSlashCommands,
      registeredGuildSlashCommands,
    );

    const embed = buildEmbed(commandTable);

    await message.channel.send({
      embeds: [embed],
    });
  },
};

export default command;
