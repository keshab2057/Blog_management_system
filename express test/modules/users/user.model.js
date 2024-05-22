const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: String,
    phone: Number,
    password: { type: String, required: true, select: false },
    email: { type: String, required: true, unique: true },
    roles: {
      type: [String],
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    token: String,
  },
  { timestamps: true }
);

module.exports = new model("User", userSchema);
