import express from "express";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";

const rootRouter = express.Router();

/* Video Controller */
// Home
rootRouter.get("/", home);
// Search Video
rootRouter.get("/search", search);

/* User Controller */
// Join : Create Account
rootRouter.route("/join").get(getJoin).post(postJoin);
// Login Page
rootRouter.route("/login").get(getLogin).post(postLogin);

export default rootRouter;
