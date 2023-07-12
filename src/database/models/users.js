const { Schema, model: Model } = require("mongoose");

module.exports = Model(
  "users",
  new Schema(
    {
      _id: { type: String, unique: true },
      money: { type: Number, default: 0 },
      banco: { type: Number, default: 0 },
    },
    {
      versionKey: false,
      autoIndex: false,
    }
  )
);
