module.exports = {
  name: "ping",
  aliases: ["pong"],
  description: "veja a minha latência com a API do Discord.",
  uso: "",
  run: async (client, message, args, config, database, emojis) => {
    message?.reply({ content: `Pong! :3` });
  },
};
