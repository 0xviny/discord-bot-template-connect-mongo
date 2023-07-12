module.exports = {
  name: "prefixo",
  aliases: [
    "prefix",
    "setprefix",
    "definirprefixo",
    "alterarprefixo",
    "newprefix",
  ],
  description: "mude meu prefixo em seu servidor.",
  uso: "[novo prefixo]",
  run: async (client, message, args, config, database, emojis) => {
    let newPrefix = args[0];

    let guildb = await database.get(message.guild.id, "Guild");

    let prefixAntigo = guildb.config.prefix;

    if (!message.member.permissions.has("Administrator"))
      return message?.reply(
        `${emojis.error} **-** ${message.author}, você precisa da permissão de \`Administrador\` para usar esse comando.`
      );
    if (!newPrefix || newPrefix.length > 3)
      return message?.reply(
        `${emojis.error} **-** ${message.author}, coloque um novo prefixo menor que **3** caracteres.`
      );
    if (prefixAntigo.toLowerCase() === newPrefix?.toLowerCase())
      return message?.reply(
        `${emojis.error} **-** ${message.author}, coloque um novo prefixo diferente do atual.`
      );

    guildb.config.prefix = newPrefix;
    guildb.save();

    message?.reply({
      content: `${emojis.correct} **-** ${message.author}, meu prefixo foi alterado com sucesso! Novo prefixo: **${newPrefix}**`,
    });
  },
};
