const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "L'email est requis"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Le nom d'utilisateur est requis"],
  },
  password: {
    type: String,
    required: [true, "Le mot de passe est requis"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);