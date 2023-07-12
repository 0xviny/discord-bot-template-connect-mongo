const User = require("./models/users");
const Guild = require("./models/guild");

class Database {
  constructor() {
    this.users = User;
    this.guilds = Guild;
  }

  async get(id, type, filter = "") {
    if (type == "User") {
      let data = await User.findOne({ _id: id }, filter);
      if (!data) data = await User.create({ _id: id });
      return data;
    } else if (type == "Guild") {
      let data = await Guild.findOne({ _id: id }, filter);
      if (!data) data = await Guild.create({ _id: id });
      return data;
    }
  }

  async add(id, amount) {
    if (!amount || !id || isNaN(amount)) return "error";
    await User.updateOne(
      { _id: id },
      { $inc: { money: amount } },
      { upsert: true }
    );
  }

  async sub(id, amount) {
    if (!amount || !id || isNaN(amount)) return "error";
    await User.updateOne(
      { _id: id },
      { $inc: { money: -amount } },
      { upsert: true }
    );
  }
}

module.exports = new Database();
