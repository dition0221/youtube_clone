let videos = [
  {
    title: "1st Video",
    rating: 5,
    comments: 2,
    createAt: "2 minutes ago",
    views: 1,
    id: 1,
  },
  {
    title: "2nd Video",
    rating: 5,
    comments: 2,
    createAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "3rd Video",
    rating: 5,
    comments: 2,
    createAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
];

/* Home */
export const trending = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });

/* Watch Video */
export const watch = (req, res) => {
  // id를 가져와서 해당 비디오 찾기
  const { id } = req.params; // const id = req.params.id;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching: ${video.title}`, video });
};

/* Edit Video(GET)에서 화면을 보여줌 */
export const getEdit = (req, res) => {
  // id를 가져와서 해당 비디오 찾기
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: `Editing: ${video.title}`, video });
};

/* Edit Video(POST)에서 변경사항을 저장 */
export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

/* Upload Video (GET) */
export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

/* Upload Video (POST) */
export const postUpload = (req, res) => {
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 0,
    comments: 0,
    createAt: "just now",
    views: 0,
    id: videos.length + 1,
  };
  videos.push(newVideo);
  return res.redirect("/");
};
