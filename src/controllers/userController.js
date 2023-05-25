/* Encrypt Package */
import bcrypt from "bcrypt";
/* DB Model */
import User from "../models/User";

/* Join : Create Account (GET) */
export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

/* Join : Create Account (POST) */
export const postJoin = async (req, res) => {
  const { name, username, password, password2, email, location } = req.body;
  const pageTitle = "Join";
  // Password Check
  if (password !== password2 || !password) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation doesn't match.",
    });
  }
  // DB에 이미 존재하는 unique 값인지 확인 (username, email)
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This 'username/email' is already taken.",
    });
  }
  // DB에 새로운 계정 저장
  try {
    await User.create({
      name,
      username,
      password,
      email,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).ender("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

/* Login (GET) */
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

/* Login (POST) */
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Log In";
  // Check username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username doesn't exists.",
    });
  }
  // Check password
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password.",
    });
  }
  // if login, Give session to user
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const logout = (req, res) => res.send("Log out");
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const see = (req, res) => res.send("See User");
