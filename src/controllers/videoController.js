/* DB Model */
import Video from "../models/video";

/* Home */
export const home = async (req, res) => {
  // DB에서 videos를 불러옴
  const videos = await Video.find({}).sort({ createdAt: "desc" });
  return res.render("home", { pageTitle: "Home", videos });
};

/* Watch Video */
export const watch = async (req, res) => {
  // id를 가져와서 DB로부터 해당 비디오 찾기
  const { id } = req.params; // const id = req.params.id;
  const video = await Video.findById(id);
  // if Error
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

/* Edit Video(GET)에서 화면을 보여줌 */
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  // if Error
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  return res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

/* Edit Video(POST)에서 변경사항을 저장 */
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  // if Error
  const video = Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found." });
  }
  // Update DB
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

/* Upload Video (GET) */
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

/* Upload Video (POST) */
export const postUpload = async (req, res) => {
  const { title, description, hashtags } = req.body;
  // DB에 저장
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    return res.status(400).ender("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

/* Delete Video */
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};

/* Search Video */
export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
