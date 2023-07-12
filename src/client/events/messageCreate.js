const config = require("../../utils/json/config.json");
const emojis = require("../../utils/json/Emojis.json");

module.exports = {
  name: "messageCreate",
  execute: async (client, message) => {
    let prefix = await client.database
      .get(message?.guild?.id, "Guild", "config")
      .then((x) => x.config.prefix);

    if (message?.author?.bot || message?.channel?.type == "DM") return;
    if (
      [`<@${client.user.id}>`, `<@!${client.user.id}>`].includes(
        message.content
      )
    )
      return message.reply(`Olá, obrigado por me mencionar.`);
    if (!message?.content.toLowerCase().startsWith(prefix.toLowerCase()))
      //message?.content.toLowerCase().startsWith(prefix.toLowerCase())
      return;

    let args = message?.content.slice(prefix.length).trim().split(/ +/g),
      cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
      try {
        command.run(client, message, args, config, client.database, emojis);
      } catch (e) {
        console.error("An error has occurred " + e);
      }
    }
  },
};
