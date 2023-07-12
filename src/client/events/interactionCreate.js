const {
  InteractionType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const { relativeTime } = require("util-stunks");
const {
  emojis: e,
  text: t,
  colors: c,
} = require("../../utils/json/config.json");
const emojis = require("../../utils/json/Emojis.json");

module.exports = {
  name: "interactionCreate",
  once: false,
  execute: async (client, interaction) => {
    if (interaction.type === InteractionType.MessageComponent) {
      if (interaction.customId.startsWith("remind-")) {
        let arr = interaction.customId.split("-"),
          btn = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setLabel("Lembrete Ativado")
              .setCustomId(`remind-allowed`)
              .setStyle(ButtonStyle.Success)
              .setEmoji("🔔")
              .setDisabled(true)
          );

        if (arr[1] != interaction.user.id) return;
        if (arr[2] < Date.now()) return;

        await interaction.message?.edit({ components: [btn] }).catch(() => {});

        interaction.reply({
          content: `${emojis.correct} **-** ${
            interaction.user
          }, lembrete ativado com sucesso! irei te lembrar em \`${relativeTime(
            Number(arr[2]),
            {
              removeMs: true,
              displayAtMax: 2,
            }
          )}\` e a mensagem definida foi \`${arr[3].replaceAll("_", " ")}\`, quando o tempo passar irei te avisar!`,
          ephemeral: true,
        });

        client.database.reminder(
          interaction.user.id,
          arr[3].replaceAll("_", " "),
          interaction.message,
          Date.now(),
          arr[2]
        );
      }
    }
  },
};
