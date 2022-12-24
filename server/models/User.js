const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    OAuth: {
      provider: {
        type: String,
      },
      snsId: {
        type: Number,
      },
    },
    roles: {
      guest: {
        type: Number,
        default: 1984,
      },
      user: { type: Number, default : 0 }, // default: 2001
      admin: { type: Number, default : 0}, //default: 5150
    },
    refreshToken: {
      type: String,
    },
    notification: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("user", UserSchema);
module.exports = User;
