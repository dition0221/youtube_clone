import express from "express";
import {
  getUpload,
  postUpload,
  watch,
  getEdit,
  postEdit,
  deleteVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

// Upload Video
videoRouter.route("/upload").get(getUpload).post(postUpload);
// Watch Video
videoRouter.get("/:id([0-9a-f]{24})", watch);
// Edit Video
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
// Delete Video
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);

export default videoRouter;
