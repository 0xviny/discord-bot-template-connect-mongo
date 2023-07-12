const { random } = require("undefined_package")

module.exports = {

  name: "guildCreate",

  execute: async (client, guild) => {
    let db = client.database.get(guild.id, "Guild", "cluster"),
      name = random(["1", "2"]);

    await client.database.guilds.updateOne({
      _id: guild.id
    }, { $set: { cluster: parseInt(name) } })

  }
}