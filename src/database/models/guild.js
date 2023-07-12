const { Schema, model: Model } = require("mongoose");

module.exports = Model(
  "guilds",
  new Schema(
    {
      _id: { type: Number, unique: true },
      config: {
        prefix: { type: String, default: "v" },
      },
    },
    {
      versionKey: false,
      autoIndex: false,
    }
  )
);
