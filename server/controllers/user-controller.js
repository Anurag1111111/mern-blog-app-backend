import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No User found" });
  }
  return res.status(200).json({ users });
};

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already registered with this email" });
  }
  const hashedpassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedpassword,
    blogs: [],
  });
  try {
    await user.save();
    return res.status(201).json({ message: "Registered Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res
      .status(404)
      .json({ message: "Could not find user with this email" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password did not match" });
  }
  return res
    .status(200)
    .json({ message: "Login Successfully", user: existingUser });
};
