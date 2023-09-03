import { InteractionCreateEvent } from "../../handlers/interactionCreateEvents.handler";
import { occupation } from "../../constants/roles";

const event: InteractionCreateEvent = {
  execute: async (_client, interaction) => {
    if (
      !(
        interaction.isStringSelectMenu() &&
        interaction.inCachedGuild() &&
        interaction.message.id === process.env.ROLE_SELECTION_MESSAGE_ID
      )
    ) {
      return;
    }

    const { roles } = interaction.member;
    const allOccupationRoles = interaction.guild.roles.cache.filter((role) =>
      occupation.map((item) => item.role).includes(role.name),
    );
    await roles.remove(allOccupationRoles);
    await roles.add(
      allOccupationRoles.filter((role) =>
        interaction.values.includes(role.name),
      ),
    );
    await interaction.update({});
  },
};

export default event;
