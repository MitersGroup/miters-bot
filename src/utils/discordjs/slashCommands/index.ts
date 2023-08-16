import { createGlobalSlashCommand } from "./_create-global-slash-command";
import { createGuildSlashCommand } from "./_create-guild-slash-command";
import { deleteGlobalSlashCommand } from "./_delete-global-slash-command";
import { deleteGuildSlashCommand } from "./_delete-guild-slash-command";
import { findGuildSlashCommand } from "./_find-guild-slash-command";
import { getGlobalSlashCommands } from "./_get-global-slash-commands";
import { getGuildSlashCommands } from "./_get-guild-slash-commands";

const djsRestHelper = {
  slashCommand: {
    global: {
      createOne: createGlobalSlashCommand,
      getAll: getGlobalSlashCommands,
      deleteOne: deleteGlobalSlashCommand,
    },
    guild: {
      createOne: createGuildSlashCommand,
      deleteOne: deleteGuildSlashCommand,
      getAll: getGuildSlashCommands,
      findOne: findGuildSlashCommand,
    },
  },
};

export default djsRestHelper;
