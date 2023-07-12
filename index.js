const { GatewayIntentBits, Collection, Client: Bot } = require("discord.js");
const { connect } = require("mongoose");
const { config } = require("dotenv");
const { color } = require("console-log-colors");

const Client = new Bot({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  sweepers: {
    messages: {
      interval: 60,
      lifetime: 600,
    },
  },
});

// COLLECTIONS

Client.commands = new Collection();
Client.aliases = new Collection();

// CLIENT

Client.database = require("./src/database/main");
Client.function = require("./src/utils/function/main");
Client.config = require("./src/utils/json/config.json");

// FILES

const events = require("fs")
  .readdirSync("./src/client/events")
  .filter((file) => file.endsWith(".js"));

// FUNCTIONS

Client.await = (ms) =>
  new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );

// COMMANDS AND EVENTS

for (let file of events) {
  let event = require(`./src/client/events/${file}`);
  if (event.once) {
    Client.once(event.name, (...args) => event.execute(Client, ...args));
  } else {
    Client.on(event.name, (...args) => event.execute(Client, ...args));
  }
}

require("fs")
  .readdirSync("./src/client/commands/prefix/")
  .forEach((folder) => {
    let commands = require("fs")
      .readdirSync(`./src/client/commands/prefix/${folder}`)
      .filter((file) => file.endsWith(".js"));
    for (let file of commands) {
      let pull = require(`./src/client/commands/prefix/${folder}/${file}`);
      if (pull.name) {
        Client.commands.set(pull.name, pull);
      }
      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach((x) => Client.aliases.set(x, pull.name));
    }
  });

// PROCCESS

process.on("uncaughtException", (err) => {
  console.error(err);
});

process.on("unhandledRejection", (err) => {
  console.error(err);
});

// START SOURCE

config();

connect(process.env.MONGO_URL)
  .then(
    console.log(
      color.yellow(
        "[DATABASE] - Conectei com sucesso a minha cluster no mongodb!"
      )
    )
  )
  .catch((e) => console.log(e));

Client.login(process.env.DISCORD_TOKEN);
