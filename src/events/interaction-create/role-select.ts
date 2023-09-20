import {
  getRoleSelectMessageCustomId,
  occupation,
} from "../../constants/roles";
import type { InteractionCreateEvent } from "../../handlers/interactionCreateEvents.handler";

const event: InteractionCreateEvent = {
  execute: async (_client, interaction) => {
    if (
      !(
        interaction.isStringSelectMenu() &&
        interaction.inCachedGuild() &&
        interaction.customId ===
          getRoleSelectMessageCustomId(interaction.member.id)
      )
    ) {
      return;
    }

    const allOccupationRoles = interaction.guild.roles.cache.filter((role) =>
      occupation.map((item) => item.role).includes(role.name),
    );
    const member = await interaction.member.roles.remove(
      Array.from(allOccupationRoles.keys()),
    );
    await member.roles.add(
      allOccupationRoles.filter((role) =>
        interaction.values.includes(role.name),
      ),
    );
    await interaction.update({ content: "设置成功！", components: [] });
  },
};

export default event;
