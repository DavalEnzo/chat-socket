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
    const user = await User.findOne({ username }).select("+password");
    if(!user){
      return res.json({message:"Nom d'utilisateur ou mot de passe incorrect" })
    }
    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
      return res.json({message:"Nom d'utilisateur ou mot de passe incorrect" })
    }
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
      sameSite: "none",
    });
    res.status(201).json({ user: user, message: "Vous êtes connecté !", success: true });
    next()
  } catch (error) {
    console.error(error);
  }
}

module.exports.CheckPassword = async (req, res, next) => {
  try {
    const {user_id, password} = req.body;
    const user = await User.findById(user_id).select("+password");
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.status(400).json({message: "Mot de passe incorrect", success: false});
    } else {
      return res.status(200).json({message: "Mot de passe correct", success: true});
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports.UpdateUser = async (req, res, next) => {
  try {
    const {user_id, email, password, profilePicture} = req.body;

    const passwordHash = await bcrypt.hash(password, 12);
    const updateUser = await User.findByIdAndUpdate(user_id, {email, password: passwordHash, profilePicture}, {new: true});
    if (!updateUser) {
      return res.status(400).json({message: "Utilisateur introuvable", success: false});
    }

    res.status(200).json({message: "Utilisateur mis à jour", success: true, user: updateUser});
    next();
  } catch (error) {
    return res.status(400).json({message: "Erreur lors de la mise à jour", success: false});
  }
}