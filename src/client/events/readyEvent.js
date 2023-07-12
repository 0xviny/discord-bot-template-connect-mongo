const { ActivityType } = require("discord.js");
const { color } = require("console-log-colors");
const ms = require("ms");

module.exports = {
  name: "ready",
  once: false,
  execute: async (client) => {
    let names = ["Hello World!"],
      stats = 0;

    setInterval(() => {
      client.user.setPresence({
        activities: [
          { name: names[stats++ % names.length], type: ActivityType.Playing },
        ],
        status: "online",
      });
    }, ms("60s"));

    console.log(
      color.red(
        `[CLIENTE] - Conectei em ${client.user.tag} - ${client.user.id}`
      )
    );
    console.log(
      color.green(`[COMANDOS] - Todos comandos carregado com sucesso!`)
    );
  },
};
