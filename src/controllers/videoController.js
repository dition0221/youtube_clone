/* DB Model */
import Video from "../models/video";

/* Home */
export const home = async (req, res) => {
  const videos = await Video.find({});
  return res.render("home", { pageTitle: "Home", videos });
};

/* Watch Video */
export const watch = (req, res) => {
  // id를 가져와서 해당 비디오 찾기
  const { id } = req.params; // const id = req.params.id;
  return res.render("watch", { pageTitle: `Watching:` });
};

/* Edit Video(GET)에서 화면을 보여줌 */
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing:` });
};

/* Edit Video(POST)에서 변경사항을 저장 */
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

/* Upload Video (GET) */
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

/* Upload Video (POST) */
export const postUpload = (req, res) => {
  const { title } = req.body;
  return res.redirect("/");
};
