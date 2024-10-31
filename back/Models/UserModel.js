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
    select: false,
  },
  profilePicture: {
    type: String,
    default: "https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=",
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