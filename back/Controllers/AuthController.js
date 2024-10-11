const User = require("../Models/UserModel");
const { createSecretToken } = require("../Utils/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: `L'utilisateur ${username} existe déjà` });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "Utilisateur inscrit !", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if(!username || !password ){
      return res.json({message:'Tous les champs sont requis' })
    }
    const user = await User.findOne({ username });
    if(!user){
      return res.json({message:"Nom d'utilisateur ou mot de passe incorrect" })
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:"Nom d'utilisateur ou mot de passe incorrect" })
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(201).json({ message: "Vous êtes connecté !", success: true });
    next()
  } catch (error) {
    console.error(error);
  }
}